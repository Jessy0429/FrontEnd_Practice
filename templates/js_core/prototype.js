function Person(name,job){
        this.name=name;
        this.job=job;
        this.sex='';
}
let p = new Person('周楠','学生')
console.log(p.__proto__.__proto__ === Object.prototype)