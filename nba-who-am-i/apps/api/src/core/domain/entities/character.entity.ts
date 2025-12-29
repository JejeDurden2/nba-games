import { CharacterType } from '@nba-who-am-i/shared';

export class CharacterEntity {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly type: CharacterType,
    public readonly hints: readonly string[],
    public readonly difficulty: number,
    public readonly createdAt: Date
  ) {
    Object.freeze(this);
  }

  static create(props: {
    id?: string;
    name: string;
    type: CharacterType;
    hints: string[];
    difficulty?: number;
  }): CharacterEntity {
    if (!props.name?.trim()) throw new Error('Character name is required');
    if (!props.hints?.length)
      throw new Error('Character must have at least one hint');
    return new CharacterEntity(
      props.id ?? crypto.randomUUID(),
      props.name.trim(),
      props.type,
      Object.freeze([...props.hints]),
      props.difficulty ?? 1,
      new Date()
    );
  }

  static fromPersistence(data: {
    id: string;
    name: string;
    type: string;
    hints: string[];
    difficulty: number;
    createdAt: Date;
  }): CharacterEntity {
    return new CharacterEntity(
      data.id,
      data.name,
      data.type as CharacterType,
      Object.freeze(data.hints),
      data.difficulty,
      data.createdAt
    );
  }

  toResponse() {
    return { id: this.id, type: this.type, hints: [...this.hints] };
  }
}
