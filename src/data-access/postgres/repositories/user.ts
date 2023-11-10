import { PoolClient } from 'pg';

export async function add(client: PoolClient, input: UserInput): Promise<User> {
  const { name, address } = input;
  const { rows } = await client.query({
    text: `
      INSERT INTO users ("name", "address_line1", "address_line2", "postal_code")
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
    values: [name, address.line1, address.line2, address.postalCode],
  });

  // return justOne(rows.map(rowToUser).map(castUser))
}
