export class CharacterEntity {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly type: string,
    public readonly hints: readonly string[],
    public readonly difficulty: number,
    public readonly universe: string,
    public readonly createdAt: Date
  ) {
    Object.freeze(this);
  }

  static create(props: {
    id?: string;
    name: string;
    type: string;
    hints: string[];
    difficulty?: number;
    universe?: string;
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
      props.universe ?? 'nba',
      new Date()
    );
  }

  static fromPersistence(data: {
    id: string;
    name: string;
    type: string;
    hints: string[];
    difficulty: number;
    universe?: string;
    createdAt: Date;
  }): CharacterEntity {
    return new CharacterEntity(
      data.id,
      data.name,
      data.type,
      Object.freeze(data.hints),
      data.difficulty,
      data.universe ?? 'nba',
      data.createdAt
    );
  }

  toResponse() {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      hints: [...this.hints],
    };
  }
}
