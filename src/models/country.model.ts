import {
    AutoIncrement,
    Column,
    DataType,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';

@Table({ tableName: 'countries' })
export class Country extends Model<Country> {
    @AutoIncrement
    @PrimaryKey
    @Column({ type: DataType.INTEGER(11) })
    public id: number;

    @Column({ type: DataType.STRING(250) })
    public title: string;

    @Column({ type: DataType.INTEGER(11) })
    public priority: string;

    @Column({ type: DataType.STRING(255) })
    public areaCodes: string;

    @Column({ type: DataType.STRING(2) })
    public iso: string;

    @Column({ type: DataType.STRING(3) })
    public iso3: string;

    @Column({ type: DataType.STRING(10) })
    public phone: string;

    public resource() {
        const item: any = this;
        const columns = ['id', 'priority', 'iso', 'iso3'];
        const resource: any = {};

        columns.map((column: any) => {
            if (column in item) {
                resource[column] = item[column];
            }
        });

        if (item.name) { resource.title = item.name; }
        if (item.phone) { resource.dialCode = item.phone; }
        if (item.areaCodes) { resource.areaCodes = item.areaCodes.split('|'); }

        return resource;
    }
}
