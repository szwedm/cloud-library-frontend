export class User {
	username: string;
	role: string;
	token?: string;

	constructor(u: string, r: string) {
		this.username = u;
		this.role = r;
	}
}
