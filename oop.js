"use strict";

// --------------------- 4 nguyên tắc cơ bản -------------------
// 1. Abstraction (Trừu tượng)
// - Trừu tượng là một quá trình ẩn các chi tiết triển khai và chỉ hiển thị chức năng cho người dùng.
// - Trong java -> tạo lớp abstract -> kế thừa lớp này -> Lớp nào đó kế thừa lớp trừu tượng thì lớp con đó bắt buộc phải override lại nội dung tất cả các phương thức trừu tượng có trong lớp đó.
// 2. Encapsulation (Đóng gói)
// - Giữ các thuộc tính và phương thức riêng tư bên trong lớp.
// 3. Inheritance  (Kế thừa)
// - Cho phép xây dựng một lớp mới dựa trên các định nghĩa của lớp đã có (Lớp cha có thể chia sẽ dữ liệu và phương thức cho các lớp con).
// 4. Polymorphism (Đa hình)
// -Một lớp con có thể ghi đè lên một phương thức mà nó được kế thừa từ một lớp cha

// ------------------------ Clasical OOP: CLASSES --------------
// Class -> instance
// 1. Objects(instances) được tạo ra từ một lớp
// 2. Methods được sao chép từ lớp cho tất cả các trường hợp.

//-------------------------- OOP trong JS ----------------------
// Prototype <- Object
// 1. Kế thừa nguyên mẫu: Mỗi đối tượng đều liên kết với một đối tượng nguyên mẫu nhất định,
// có thể sử dụng properties và method được định nghĩa trên nguyên mẫu đó.
// 2. Methods được ủy quyền cho đối tượng nguyên mẫu(prototype) được liên kết.( # khác với class oop cổ điển)

// Ex:
// const arr = [1, 2, 3];
// console.dir(arr);
//Khi tạo một mảng arr thì arr được liên kết với Array.prototype
// -> do đó nó có quyền truy cập vào các methods được xác định trên Array.prototype
// => Methods không được định nghĩa trên đối tượng arr mà trên prototype của nó.

// ---- Tạo prototype , Liên kết object đến prototype

// ------------------------------ 3 cách tạo ----------------------------
// 1. constructor function
// - Đây là cách các đối tượng tích hợp sẵn như Arrays, Maps hoặc Sets thực sự được triển khai.
// 2. ES6 classes
// - Cú pháp hiện đại hơn
// - Tuy nhiên đằng sau các lớp ES6 hoạt động chính xác như khi tạo bằng constructor function
// 3. Object.create()
// - Cách dễ nhất và đơn giản nhất để liên kết một đối tượng với một đối tượng nguyên mẫu

// Cách 1:
console.log("------------ constructor function -------------");
const Person = function (firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = 2000;

    // Không nên tạo một method bên trong constructor function(Vì nếu khi tạo một instance nó sẽ định nghĩa thêm cái method calcAge này trong instance nữa)
    // this.calcAge = function () {
    //     console.log(2022 - this.birthYear);
    // };
};
// -> nên dùng prototype thêm một method
Person.prototype.calcAge = function () {
    console.log(2022 - this.birthYear);
};

//static method
Person.hey = function () {
    console.log("This is Static method 👋");
    console.dir(this);
};
// Person.hey();

const hiep = new Person("Hiep", 2000);
// Lúc này:
// 1. Một {} được tạo
// 2. Hàm được gọi, this = {}
// 3. {} liên kết với prototype của Person
// 4. Hàm tự động return {}

// Prototype chain
console.log(hiep);
console.log(hiep.__proto__); //chính là Person.prototype
console.log(hiep.__proto__.__proto__); // chính là Object.prototype
console.log(hiep.__proto__.__proto__.__proto__); // null

// Nguyên tắc hoạt động
// Vd: hiep.hasOwnProperty("firstName")
// 1. Tìm phương thức này trên chính đối tượng hiep -> ko có
// 2. Theo cách thức hoạt động Prototype chain, nó nhìn vào prototype của nó là Person.prototype -> ko có
// 3. Nó tiếp tục nhìn vào Object.prototype -> có

// Kiểm tra
// console.log(hiep instanceof Person); // #true kiểm tra hiep phải là instance của Person
// console.log(Person.prototype.isPrototypeOf(hiep)); // #true kiểm tra hiep phải là prototype của Person
// console.log(hiep.hasOwnProperty("firstName")); //#true kiểm tra firstName có phải là tài sản riêng của hiep không

// Cách 2:
console.log("------------ ESC Class -------------");
class PersonCl {
    constructor(firstName, birthYear) {
        (this.firstName = firstName), (this.birthYear = birthYear);
    }
    get birthYearFn() {
        return this.birthYear;
    }

    set birthYearFn(birthYear) {
        this.birthYear = birthYear;
    }
    calcAge() {
        console.log(2022 - this.birthYear);
    }

    // Static method: không nằm trên prototype, mà nằm trong PersonCl
    static hey() {
        console.log("This is Static method 👋");
        console.dir(this);
    }
}
PersonCl.prototype.greet = function () {
    console.log(`Hey ${this.firstName}`);
};

const hieu = new PersonCl("Hieu", 2000);
console.log(hieu);
hieu.birthYear = 2005; // set -> truyền bằng cách gán cho nó giá trị
console.log(hieu.birthYear); // get
PersonCl.hey();

// Cách 3:
console.log("------------ Object.create() -------------");
// tạo object bình thường
const PersonProto = {
    calcAge() {
        console.log(2022 - this.birthYear);
    },
    //Tự mình tạo ra
    init(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    },
};
// Tạo bằng Object.create() -> tự động link object PersonProto thành prototype cho vu
const vu = Object.create(PersonProto);
vu.init("Vu", 2000);
vu.calcAge();
console.log(vu);
console.log(vu.__proto__); // chính là object PersonProto

//--------------------- Kế thừa - Constructor Functions --------------------

console.log(
    "-------------------Kế thừa classes: Constructor Functions------------"
);
// Ta kế thừa Person ở trên
const Student = function (firstName, birthYear, course) {
    Person.call(this, firstName, birthYear);
    this.course = course;
};

// Linking prototypes
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student("Mike", 2020, "Computer Science");
mike.introduce();
mike.calcAge();

console.log(mike);
console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

console.log(mike instanceof Student); //#true
console.log(mike instanceof Person); //#true
console.log(mike instanceof Object); //#true

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);

//--------------------- Kế thừa - ES6 Classes --------------------
console.log("-------------------Kế thừa classes: ES6 Classes------------");
class StudentCl extends PersonCl {
    constructor(firstName, birthYear, course) {
        // Always needs to happen first!
        super(firstName, birthYear);
        this.course = course;
    }

    introduce() {
        console.log(`My name is ${this.firstName} and I study ${this.course}`);
    }

    //ghi đè
    calcAge() {
        console.log(
            `I'm ${
                2022 - this.birthYear
            } years old, but as a student I feel more like ${
                2022 - this.birthYear + 10
            }`
        );
    }
}

const martha = new StudentCl("Martha", 2000, "Computer Science");
console.log(martha);
martha.introduce();
martha.calcAge();

//--------------------- Kế thừa - Object.create --------------------
console.log("-------------------Kế thừa classes: Object.create------------");

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
    PersonProto.init.call(this, firstName, birthYear);
    this.course = course;
};

StudentProto.introduce = function () {
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto);
jay.init("Jay", 2010, "Computer Science");
jay.introduce();
jay.calcAge();

// --------------------- Đóng gói ----------------------------------
console.log("-------------------Đóng gói------------");

// 1) Public fields
// 2) Private fields
// 3) Public methods
// 4) Private methods
// (there is also the static version)

class Account {
    // 1) Public fields (instances)
    locale = navigator.language;

    // 2) Private fields (instances)
    #movements = [];
    #pin;

    constructor(owner, currency, pin) {
        this.owner = owner;
        this.currency = currency;
        this.#pin = pin;

        // Protected property
        // this._movements = [];
        // this.locale = navigator.language;

        console.log(`Thanks for opening an account, ${owner}`);
    }

    // 3) Public methods

    // Public interface
    getMovements() {
        return this.#movements;
    }

    deposit(val) {
        this.#movements.push(val);
        return this;
    }

    withdraw(val) {
        this.deposit(-val);
        return this;
    }

    requestLoan(val) {
        // if (this.#approveLoan(val)) {
        if (this._approveLoan(val)) {
            this.deposit(val);
            console.log(`Loan approved`);
            return this;
        }
    }

    // chỉ truy cập từ class
    static helper() {
        console.log("Helper");
    }

    // 4) Private methods
    // #approveLoan(val) {
    _approveLoan(val) {
        return true;
    }
}

const acc1 = new Account("Hiep", "VND", 1111);
console.log(acc1);

// acc1._movements.push(250);
// acc1._movements.push(-140);
// acc1.approveLoan(1000);

acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);
console.log(acc1.getMovements());
console.log(acc1);
Account.helper();

// #lỗi
// console.log(acc1.#movements);
// console.log(acc1.#pin);
// console.log(acc1.#approveLoan(100));

// Chaining methods;
acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);
console.log(acc1.getMovements());
