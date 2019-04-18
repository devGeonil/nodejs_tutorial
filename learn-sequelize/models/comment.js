module.exports = (sequelize, DataTypes) =>{
  return sequelize.define('comment',{
    comment:{
      type:DataTypes.STRING(100),
      allowNull:false,
    },
    create_at:{
      type:DataTypes.DATE,
      allowNull:false,
      defaultValue:sequelize.literal('now()'),
    }
  },{
    timestamp:false,
    underscored:true
  });
};

/*
작성자 , 댓글내용 , 생성일


*/
