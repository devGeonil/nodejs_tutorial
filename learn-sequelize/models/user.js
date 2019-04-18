module.exports = (sequelize, DataTypes) =>{
  return sequelize.define('user',{
    name:{
      type:DataTypes.STRING(20),
      allowNull: false,
      unique:true,
    },
    age:{
      type:DataTypes.INTEGER.UNSIGNED,
      allowNull:false,
    },
    married:{
      type:DataTypes.BOOLEAN,
      allowNull:false,
    },
    comment:{
      type:DataTypes.TEXT,
      allowNull:true,
    },
    create_at:{
      type:DataTypes.DATE,
      allowNull:false,
      defaultValue:sequelize.literal('now()'),
    }
  },{
    timestamp:false,
    underscored:true,
  });
};

//users 테이블
/*
이름 , 나인 , 결혼여부  , 댓글 , 생성일
zero   23     false      안녕세요,  2019-04-18
nero   32    true         반갑,      2019-04-77


*/
