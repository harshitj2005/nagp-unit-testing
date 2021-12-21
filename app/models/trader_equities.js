"use strict";

module.exports = function(sequelize, DataTypes) {

	var TraderEquities = sequelize.define("TraderEquities", 
		{
			id:{
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV1,
				primaryKey:true
			},
			trader_id: {
				type:DataTypes.STRING,
				allowNull: false,
			},
			equity_name: {
				type:DataTypes.STRING,
				allowNull: false,
			},
			equity_value: {
				type:DataTypes.INTEGER(11),
				allowNull: false,
			},
			created_at: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: "CURRENT_TIMESTAMP"
			},
			modified_at: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: "CURRENT_TIMESTAMP(6)"
			},
		},
		{
			instanceMethods: {
			},
			hooks: {
				beforeCreate: function (TraderEquities, options) {
					return new Promise ((resolve) => {
						TraderEquities.created_at = sequelize.fn("NOW");
						TraderEquities.modified_at = sequelize.fn("NOW");
						return resolve(TraderEquities, options);
					});
				},
				beforeUpdate: function (TraderEquities, options) {
					return new Promise ((resolve) => {
						TraderEquities.modified_at = sequelize.fn("NOW");
						return resolve(TraderEquities, options);
					});
				},
			},
			timestamps: false,
			tableName: "trader_equities",
			freezeTableName: true,
		}
	);

	return TraderEquities;
};
