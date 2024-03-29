module.exports = (prisma, status) =>
  async(req, res) => {
    const nickname = req.headers.nickname;

    const { userId, userPassword } = req.body;
    
    if (!userId || !userPassword) {
      return status.UnprocessableEntity;
    };

    try {
      await prisma.account.updateMany({
        where: {
          nickname: nickname
        },
        data:{
          userId: userId
        }
      });

      return {
        status: status.Created.status,
        data: userId
      };

    } catch (error) {
      console.log(error);
      return status.InternalServerError;
    };
  };