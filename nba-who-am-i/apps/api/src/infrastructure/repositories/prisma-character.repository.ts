// apps/api/src/infrastructure/repositories/prisma-character.repository.ts

import { Injectable } from '@nestjs/common';
import { Character, Prisma } from '@prisma/client';
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
    difficulty?: number,
    universe: string = 'nba'
  ): Promise<CharacterEntity> {
    // Build where clause with universe filter, exclusions and optional difficulty
    const where: Prisma.CharacterWhereInput = {
      universe, // Always filter by universe
    };

    if (excludeIds.length > 0) {
      where.id = { notIn: excludeIds };
    }
    if (difficulty !== undefined) {
      where.difficulty = difficulty;
    }

    // Get all available IDs matching filters
    const availableCharacters = await this.prisma.character.findMany({
      where,
      select: { id: true },
    });

    if (availableCharacters.length === 0) {
      // If all excluded, get any character with same universe and difficulty
      const fallbackWhere: Prisma.CharacterWhereInput = { universe };
      if (difficulty !== undefined) {
        fallbackWhere.difficulty = difficulty;
      }

      const allCharacters = await this.prisma.character.findMany({
        where: fallbackWhere,
        select: { id: true },
      });

      if (allCharacters.length === 0) {
        throw new Error(
          `No characters in database for universe "${universe}"${difficulty !== undefined ? ` at difficulty ${difficulty}` : ''}`
        );
      }

      const randomIndex = Math.floor(Math.random() * allCharacters.length);
      const randomId = allCharacters[randomIndex].id;
      const character = await this.prisma.character.findUnique({
        where: { id: randomId },
      });
      return CharacterEntity.fromPersistence(character!);
    }

    // Random selection from available
    const randomIndex = Math.floor(Math.random() * availableCharacters.length);
    const randomId = availableCharacters[randomIndex].id;

    const character = await this.prisma.character.findUnique({
      where: { id: randomId },
    });
    return CharacterEntity.fromPersistence(character!);
  }

  async findAll(universe?: string): Promise<CharacterEntity[]> {
    const where: Prisma.CharacterWhereInput = {};
    if (universe) {
      where.universe = universe;
    }

    const characters: Character[] = await this.prisma.character.findMany({
      where: Object.keys(where).length > 0 ? where : undefined,
    });
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
        universe: c.universe,
      },
      create: {
        id: c.id,
        name: c.name,
        type: c.type,
        hints: [...c.hints],
        difficulty: c.difficulty,
        universe: c.universe,
      },
    });
    return CharacterEntity.fromPersistence(d);
  }

  async count(universe?: string): Promise<number> {
    const where: Prisma.CharacterWhereInput = {};
    if (universe) {
      where.universe = universe;
    }

    return this.prisma.character.count({
      where: Object.keys(where).length > 0 ? where : undefined,
    });
  }
}
