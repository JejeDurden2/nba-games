import { CharacterEntity } from '../../domain/entities/character.entity';

export interface ICharacterRepository {
  findById(id: string): Promise<CharacterEntity | null>;
  findRandom(
    excludeIds?: string[],
    difficulty?: number,
    universe?: string
  ): Promise<CharacterEntity>;
  findAll(universe?: string): Promise<CharacterEntity[]>;
  save(character: CharacterEntity): Promise<CharacterEntity>;
  count(universe?: string): Promise<number>;
}

export const CHARACTER_REPOSITORY = Symbol('ICharacterRepository');
