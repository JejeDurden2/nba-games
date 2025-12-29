// apps/api/src/infrastructure/repositories/prisma-character.repository.ts

import { Injectable } from '@nestjs/common';
import { Character } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ICharacterRepository } from '../../core/application/ports/character.repository.port';
import { CharacterEntity } from '../../core/domain/entities/character.entity';

@Injectable()
export class PrismaCharacterRepository implements ICharacterRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<CharacterEntity | null> {
    const d = await this.prisma.character.findUnique({ where: { id } });
    return d ? CharacterEntity.fromPersistence(d) : null;
  }

  async findRandom(
    excludeIds: string[] = [],
    difficulty?: number
  ): Promise<CharacterEntity> {
    // Build where clause with exclusions and optional difficulty filter
    const where: { id?: { notIn: string[] }; difficulty?: number } = {};
    if (excludeIds.length > 0) {
      where.id = { notIn: excludeIds };
    }
    if (difficulty !== undefined) {
      where.difficulty = difficulty;
    }

    // Récupérer tous les IDs disponibles
    const availableCharacters = await this.prisma.character.findMany({
      where: Object.keys(where).length > 0 ? where : undefined,
      select: { id: true },
    });

    if (availableCharacters.length === 0) {
      // Si tous exclus, on prend n'importe lequel avec la même difficulté si spécifiée
      const fallbackWhere =
        difficulty !== undefined ? { difficulty } : undefined;
      const allCharacters = await this.prisma.character.findMany({
        where: fallbackWhere,
        select: { id: true },
      });
      if (allCharacters.length === 0)
        throw new Error('No characters in database for this difficulty');

      const randomIndex = Math.floor(Math.random() * allCharacters.length);
      const randomId = allCharacters[randomIndex].id;
      const character = await this.prisma.character.findUnique({
        where: { id: randomId },
      });
      return CharacterEntity.fromPersistence(character!);
    }

    // Sélection aléatoire
    const randomIndex = Math.floor(Math.random() * availableCharacters.length);
    const randomId = availableCharacters[randomIndex].id;

    const character = await this.prisma.character.findUnique({
      where: { id: randomId },
    });
    return CharacterEntity.fromPersistence(character!);
  }

  async findAll(): Promise<CharacterEntity[]> {
    const characters: Character[] = await this.prisma.character.findMany();
    return characters.map((c) => CharacterEntity.fromPersistence(c));
  }

  async save(c: CharacterEntity): Promise<CharacterEntity> {
    const d = await this.prisma.character.upsert({
      where: { id: c.id },
      update: {
        name: c.name,
        type: c.type,
        hints: [...c.hints],
        difficulty: c.difficulty,
      },
      create: {
        id: c.id,
        name: c.name,
        type: c.type,
        hints: [...c.hints],
        difficulty: c.difficulty,
      },
    });
    return CharacterEntity.fromPersistence(d);
  }

  async count(): Promise<number> {
    return this.prisma.character.count();
  }
}
