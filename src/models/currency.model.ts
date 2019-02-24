import {
    AutoIncrement,
    Column,
    DataType,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';

@Table({ tableName: 'currencies' })
export class Currency extends Model<Currency> {
    @AutoIncrement
    @PrimaryKey
    @Column({ type: DataType.INTEGER(11) })
    public id: number;

    @Column({ type: DataType.STRING(50) })
    public name: string;

    @Column({ type: DataType.STRING(10) })
    public code: string;

    @Column({ type: DataType.STRING(10) })
    public symbol: string;

    @Column({ type: DataType.DOUBLE(10, 4) })
    public rate: string;

    @Column({ type: DataType.STRING(10) })
    public locale: string;

    @Column({ type: DataType.INTEGER(1) })
    public default: string;

    @Column({ type: DataType.INTEGER(11) })
    // tslint:disable-next-line:variable-name
    public sort_order: string;

    @Column({ type: DataType.INTEGER(1) })
    public status: string;

    public resource() {
        const item: any = this;
        const columns = ['id', 'name', 'code', 'symbol', 'rate', 'locale', 'default'];
        const resource: any = {};

        columns.map((column: any) => {
            if (column in item) {
                resource[column] = item[column];
            }
        });

        return resource;
    }
}
