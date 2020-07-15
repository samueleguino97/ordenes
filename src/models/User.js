class User {
  constructor(data = {}) {
    this.access_token = data.access_token;
    this.address = data.address;
    this.created_datetime = data.created_datetime;
    this.email = data.email;
    this.first_name = data.first_name;
    this.image = data.image;
    this.last_name = data.last_name;
    this.mobile = data.mobile;
    this.phone = data.phone;
    this.updated_datetime = data.updated_datetime;
    this.user_role = data.user_role;
    this.username = data.username;
  }

  isClient() {
    this.user_role === 'Client';
  }
}

export default User;
