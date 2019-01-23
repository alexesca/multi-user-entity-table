export class Entity {
    firstName: string;
    lastName: string;
    name: string;
    email: string;
    phoneNumber: string;
    street: string;
    street2: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    id: string;

    constructor(obj: any) {
        if (obj) {
            this.firstName = obj.firstName;
            this.lastName = obj.lastName;
            this.name = obj.name;
            this.email = obj.email;
            this.phoneNumber = obj.phoneNumber;
            this.state = obj.state;
            this.zipCode = obj.zipCode;
            this.street = obj.street;
            this.city = obj.city;
            this.id = obj.id;
        } else {
            this.firstName = '';
            this.lastName = '';
            this.name = '';
            this.email = '';
            this.phoneNumber = '';
            this.state = '';
            this.zipCode = '';
            this.street = '';
            this.city = '';
            this.id = '';
        }
    }
}
