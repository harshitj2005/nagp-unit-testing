"use strict";

module.exports = function(sequelize, DataTypes) {

	var Trader = sequelize.define("Trader", 
		{
			id:{
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV1,
				primaryKey:true
			},
			funds: {
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
				beforeCreate: function (Trader, options) {
					return new Promise ((resolve) => {
						Trader.created_at = sequelize.fn("NOW");
						Trader.modified_at = sequelize.fn("NOW");
						return resolve(Trader, options);
					});
				},
				beforeUpdate: function (Trader, options) {
					return new Promise ((resolve) => {
						Trader.modified_at = sequelize.fn("NOW");
						return resolve(Trader, options);
					});
				},
			},
			timestamps: false,
			tableName: "traders",
			freezeTableName: true,
		}
	);

	return Trader;
};
