import {
    AllowNull,
    AutoIncrement,
    Column,
    DataType,
    Default,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class User extends Model<User> {
    @AutoIncrement
    @PrimaryKey
    @Column({ type: DataType.INTEGER(11) })
    public id: number;

    @Column({ type: DataType.STRING(50) })
    // tslint:disable-next-line:variable-name
    public first_name: string;

    @Column({ type: DataType.STRING(50) })
    // tslint:disable-next-line:variable-name
    public last_name: string;

    @Column({ type: DataType.STRING(50) })
    public username: string;

    @Column({ type: DataType.STRING(255) })
    @Default('')
    public email: string;

    @Column({ type: DataType.STRING(100) })
    @AllowNull(false)
    public password: string;

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
