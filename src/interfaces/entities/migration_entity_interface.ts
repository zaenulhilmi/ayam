interface MigrationEntityInterface {
  id?: number;
  file_name: string;
  step: number;
  created_at?: Date;
  updated_at?: Date;
}

export default MigrationEntityInterface;
