type User = {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  image: string;
};

declare global {
  interface CustomJwtSessionClaims extends User {}
}
