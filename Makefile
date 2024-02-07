run:
	npm run dev
generate:
	npx prisma generate
migrate:
	npx prisma migrate dev
create new migration:
	npx prisma migrate dev --name <filename migration>