const {PrismaClient} = require("@prisma/client");

// const prisma = new PrismaClient();

const prisma = new PrismaClient().$extends({
  query: {
    $allModels: {
      async delete({model, operation, args, query}) {
        // soft delete one
        model.update({
          where: {
            id: args.where.id,
          },
          data: {
            deleted_status: true,
            deleted_at: new Date(),
          },
        });
        return query(args);
      },
    },
  },
});

export default prisma;
