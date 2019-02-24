import {
    AutoIncrement,
    Column,
    DataType,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';

@Table({ tableName: 'languages' })
export class Language extends Model<Language> {
    @AutoIncrement
    @PrimaryKey
    @Column({ type: DataType.INTEGER(11) })
    public id: number;

    @Column({ type: DataType.STRING(255) })
    public code: string;

    @Column({ type: DataType.INTEGER(1) })
    public status: string;

    @Column({ type: DataType.INTEGER(11) })
    // tslint:disable-next-line:variable-name
    public sort_order: string;

    public resource() {
        const item: any = this;
        const columns = ['id', 'code'];
        const resource: any = {};

        columns.map((column: any) => {
            if (column in item) {
                resource[column] = item[column];
            }
        });

        return resource;
    }
}
