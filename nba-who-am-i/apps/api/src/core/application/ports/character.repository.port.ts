import { CharacterEntity } from '../../domain/entities/character.entity';

export interface ICharacterRepository {
  findById(id: string): Promise<CharacterEntity | null>;
  findRandom(excludeIds?: string[]): Promise<CharacterEntity>;
  findAll(): Promise<CharacterEntity[]>;
  save(character: CharacterEntity): Promise<CharacterEntity>;
  count(): Promise<number>;
}

export const CHARACTER_REPOSITORY = Symbol('ICharacterRepository');
