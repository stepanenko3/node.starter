import {
    AutoIncrement,
    Column,
    DataType,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';

@Table({ tableName: 'configurations' })
export class Configuration extends Model<Configuration> {
    @AutoIncrement
    @PrimaryKey
    @Column({ type: DataType.INTEGER(11) })
    public id: number;

    @Column({ type: DataType.STRING(255) })
    public key: string;

    @Column({ type: DataType.TEXT })
    public value: string;
}
