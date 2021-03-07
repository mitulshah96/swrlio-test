const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    return sequelize.define(
        'search_trend',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            keyword: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            keyword_count: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            indexes: [
                {
                    unique: true,
                    fields: ['keyword'],
                },
            ],
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            tableName: 'search_trends',
        }
    );
};
