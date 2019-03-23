/*jshint esversion: 6*/
'use strict';

console.log('// ---------------------------------1--------------------------------------')

const sumFunc = (x, y) => x + y;

class StudentLog {
	constructor (name) {
		this._name = name;
		this._grades = {};
	}

	getName() {
		return this._name;
	}

	addGrade(grade, subject) {
		if (typeof(grade) !== 'number' || grade < 1 || grade > 5) {
			return `Вы пытались поставить оценку "${grade}" по предмету "${subject}". Допустимые значения: 1-5.`;
		}
		if (!this._grades[subject]) {
			this._grades[subject] = [];
		}
		this._grades[subject].push(grade);
		return this._grades[subject].length;
	}

	sumGrades(subject) {
		const grades = this._grades[subject];
		if (grades) {
			return grades.reduce(sumFunc, 0);
		}
		return 0;
	}

	getAverageBySubject(subject) {
		const grades = this._grades[subject];
		if (grades) {
			return this.sumGrades(subject) / grades.length;
		}
		return `По предмету "${subject}" оценок нет.`;
	}

	getTotalAverage() {
		const keys = Object.keys(this._grades);
		const self = this;
		return keys.reduce((sum, elem) => sumFunc(self.sumGrades(elem), sum), 0) / 
			keys.reduce((sum, elem) => sumFunc(self._grades[elem].length, sum), 0);
	}

	getGradesBySubject(subject) {
		const grades = this._grades[subject];
		if (grades) {
			return grades;
		}
		return [];
	}

	getGrades() {
		return this._grades;
	}

}


const log = new StudentLog('Олег Никифоров');
console.log(log.getName());
console.log(log.addGrade(3, 'algebra'));
console.log(log.addGrade('отлично!', 'math'));

console.log(log.addGrade(4, 'algebra'));

console.log(log.addGrade(5, 'geometry'));
console.log(log.addGrade(25, 'chemistry'));

console.log(log.getAverageBySubject('geometry'));
console.log(log.getAverageBySubject('algebra'));
console.log(log.getAverageBySubject('math'));

console.log(log.getTotalAverage());

console.log(log.getGradesBySubject('geometry'));
console.log(log.getGradesBySubject('algebra'));
console.log(log.getGradesBySubject('math'));

console.log(log.getGrades());

console.log('// ---------------------------------2--------------------------------------')


let gameOver = false;

class Weapon {
	constructor(obj) {
		this.name = obj.name;
		this.attack = obj.attack;
		this.durability = obj.durability;
		this.range = obj.range;

		this.startDurability = obj.durability;
	}

	takeDamage(damage) {
		const lastDurability = this.durability;
		this.durability -= damage;
		if (this.durability < 0) {
			this.durability = 0;
		}
		console.log(`🗡️ ${this.name} потерял прочность с ${lastDurability.toFixed(0)} до ${this.durability.toFixed(0)}`);
	}

	getDamage() {
		if (this.durability >= 0.3 * this.startDurability) {
			return this.attack;
		}
		if (this.isBroken()) {
			return 0;
		}
		return this.attack / 2;
	}

	isBroken() {
		return this.durability === 0;
	}
}

class Arm extends Weapon {
	constructor(obj) {
		super(Object.assign({
			name: 'Рука',
			attack: 1,
			durability: Infinity,
			range: 1
		}, obj));
	}
}

class Bow extends Weapon {
	constructor(obj) {
		super(Object.assign({
			name: 'Лук',
			attack: 10,
			durability: 200,
			range: 3
		}, obj));
	}
}

class Sword extends Weapon {
	constructor(obj) {
		super(Object.assign({
			name: 'Меч',
			attack: 25,
			durability: 500,
			range: 1
		}, obj));
	}
}

class Knife extends Weapon {
	constructor(obj) {
		super(Object.assign({
			name: 'Нож',
			attack: 5,
			durability: 300,
			range: 1
		}, obj));
	}
}

class Staff extends Weapon {
	constructor(obj) {
		super(Object.assign({
			name: 'Посох',
			attack: 8,
			durability: 300,
			range: 2
		}, obj));
	}
}

class LongBow extends Bow {
	constructor(object) {
		super(Object.assign({
			name: 'Длинный лук',
			attack: 15,
			range: 4
		}, obj));
	}
}

class Axe extends Sword {
	constructor(obj) {
		super(Object.assign({
			name: 'Секира',
			attack: 27,
			durability: 800
		}, obj));
	}
}

class StormStaff extends Staff {
	constructor(obj) {
		super(Object.assign({
			name: 'Посох Бури',
			attack: 10,
			range: 3
		}, obj));
	}
}


class Player {
	constructor(obj) {
		this.life = typeof(obj.life) === 'number' && obj.life > 0 ? obj.life : 100;
		this.startLife = this.life;

		this.magic = typeof(obj.magic) === 'number' && obj.magic > 0 ? obj.magic : 20;
		this.startMagic = this.magic;

		this.speed = typeof(obj.speed) === 'number' && obj.speed > 0 ? obj.speed : 1;
		this.attack = typeof(obj.attack) === 'number' && obj.attack > 0 ? obj.attack : 10;
		this.agility = typeof(obj.agility) === 'number' && obj.agility > 0 ? obj.agility : 5;
		this.luck = typeof(obj.luck) === 'number' && obj.luck > 0 ? obj.luck : 10;
		
		this.description = typeof(obj.description) === 'string' && obj.description.length > 0 ? obj.description : 'Игрок';
		this.name = typeof(obj.name) === 'string' && obj.name.length > 0 ? obj.name : 'Имя';

		this.accusativeName = obj.accusativeName; // Имя в винительном падеже нужно для логов

		this.availWeapon = Array.isArray(obj.availWeapon) && obj.availWeapon.length > 0 ? obj.availWeapon : [Arm];
		this.currWeaponInd = 0;
		this.weapon = new this.availWeapon[this.currWeaponInd]();

		this.position = typeof(obj.position) === 'number' ? obj.position : 0;
	}

	getLuck() {
		return (100 * Math.random() + this.luck) / 100;
	}

	getDamage(distance) {
		if (distance > this.weapon.range) {
			return 0;
		}
		return (this.attack + this.weapon.getDamage()) * this.getLuck() / distance;
	}

	takeDamage(damage) {
		console.log(`💔 ${this.name} теряет здоровье:  ${this.life.toFixed(0)} минус ${damage.toFixed(0)}`);
		this.life -= damage;
		if (this.life < 0) {
			this.life = 0;
			console.log(`☠ ${this.name} вне игры.`);
		}
	}

	isDead() {
		return this.life === 0;
	}

	moveLeft(distance) {
		this.position -= distance > this.speed ? this.speed : distance;
	}

	moveRight(distance) {
		this.position += distance > this.speed ? this.speed : distance;
	}

	move(distance) {
		const lastPosition = this.position;
		if (distance > 0) {
			this.moveRight(distance);
		} else {
			this.moveLeft(Math.abs(distance)); // Я так понял, в задании ошибка, надо смещать на abs(distance), иначе получится минус на минус. Я бы просто логику moveLeft, moveRight реализовал в move
		}
		console.log(`🏃‍ ${this.name} изменил позицию с ${lastPosition} на ${this.position}`);
	}

	isAttackBlocked() {
		return this.getLuck() > (100 - this.luck) / 100;
	}

	dodged() {
		return this.getLuck() > (100 - this.agility - this.speed * 3) / 100;
	}

	takeAttack(damage) {
		if (this.isAttackBlocked()) {
			this.weapon.takeDamage(damage);
			console.log(`🛡 Удачливый ${this.name}, его оружие заблокировало удар`);
		} else if (this.dodged()) {
			// урон не засчитывается
			console.log(`🐱‍👤 ${this.name} увернулся от удара`);
		} else {
			this.takeDamage(damage);
		}
	}

	checkWeapon() {
		if (this.weapon.isBroken()) {
			const brokenWeapon = this.weapon;

			if (this.currWeaponInd < this.availWeapon.length - 1) {
				this.currWeaponInd++;
				this.weapon = new this.availWeapon[this.currWeaponInd]();
				console.log(`🗡 ${this.name} проверяет состояние своего оружия (у него сейчас ${brokenWeapon.name}) и обнаруживает, что оно сломано. Теперь его оружие : ${this.weapon.name}`);
			}
		} else {
			console.log(`🗡 ${this.name} проверяет состояние своего оружия (у него сейчас ${this.weapon.name}), оружие в порядке`);
		}
	}

	tryAttack(enemy) {
		let coefPosition = 1;

		if (this.position == enemy.position) {
			// Не понимаю фразу из задания "Если игроки имеют одно и то же положение (position)", 
			// при этом выше написано "Рассчитать расстояние между игроком и врагом (distance). Расстояние между игроками всегда больше 0"
			// Если одни на одной позиции, то расстояние 0, и это невозможная ситуация
			console.log(`🏃‍ Атакуемый ${enemy.name} отскакивает вправо, так как оказался на одной позиции с соперником`);
			enemy.moveRight(1);
			coefPosition = 2;
		}

		const distance = Math.abs(enemy.position - this.position);
		if (this.weapon.range < distance) { // я думаю в задании ошибка, написано "больше distance"
			console.log(`❌ ${this.name} пытался атаковать ${enemy.accusativeName}, но не хватило дальности оружия`);
			return;
		}
		this.weapon.takeDamage(10 * this.getLuck());

		enemy.takeAttack(coefPosition * this.getDamage(distance));
	}

	chooseEnemy(players) {
		const alivePlayersWithoutMe = players.filter(p => p !== this && !p.isDead());
		const minLife = Math.min(...alivePlayersWithoutMe.map(p => p.life));
		return alivePlayersWithoutMe.find(p => p.life === minLife);
	}

	moveToEnemy(enemy) {
		// из задания непонятно, что имеется в виду "осуществляет движение"
		// предполагаю, что мы должны попробовать сдвинуться на разницу наших позиций
		this.move(enemy.position - this.position);
	}

	turn(players) {
		// "Реализуйте метод turn( players ) в соответствии с правилами каждого класса." — не понял, о каких правилах идёт речь
		const enemy = this.chooseEnemy(players);
		if (enemy === undefined) {
			// Я — единственный выживший
			console.log(`🙌 ${this.name} объявил: "Я — последний в живых! Я победил!"`);
			console.log(players);
			gameOver = true;
			return;
		}
		this.checkWeapon();

		console.log(`⚔ ${this.name} решил атаковать ${enemy.accusativeName}`);
		this.moveToEnemy(enemy);
		this.tryAttack(enemy);
	}
}



class Warrior extends Player {
	constructor(obj) {
		super(Object.assign({
			life: 120,
			speed: 2,
			attack: 10,
			description: 'Воин',
			availWeapon: [Sword, Knife, Arm]
		}, obj));
	}

	takeDamage(damage) {
		if (this.life < this.startLife * 0.5 && this.getLuck() > 0.8 && this.magic > 0) {
			this.magic -= damage;
			if (this.magic < 0) {
				this.magic = 0;
			}
		} else {
			// "При нулевом значении маны урон вычитается из здоровья"
			// я это трактовал, как "Иначе вычислять по наследуемому классу"
			super.takeDamage(damage);
		}
	}
}

class Archer extends Player {
	constructor(obj) {
		super(Object.assign({
			life: 80,
			magic: 35,
			attack: 5,
			agility: 10,
			description: 'Лучник',
			availWeapon: [Bow, Knife, Arm]
		}, obj));
	}

	getDamage(distance) {
		return (this.attack + this.weapon.getDamage()) * this.getLuck() * distance / this.weapon.range;
	}
}

class Mage extends Player {
	constructor(obj) {
		super(Object.assign({
			life: 70,
			magic: 100,
			attack: 5,
			agility: 8,
			description: 'Маг',
			availWeapon: [Staff, Knife, Arm]
		}, obj));
	}

	takeDamage(damage) {
		if (this.magic > this.startMagic * 0.5) {
			damage /= 1.5; // я не понял, что такое "базовый урон" и уменьшил текущий урон в 1.5, но у меня не сходится ответ с примером из задачи

			this.magic -= 12;
			if (this.magic < 0) {
				this.magic = 0;
			}
		}
		super.takeDamage(damage);
	}
}

class Dwarf extends Warrior {
	constructor(obj) {
		super(Object.assign({
			life: 130,
			attack: 15,
			luck: 20,
			description: 'Гном',
			availWeapon: [Axe, Knife, Arm]
		}, obj));
		this.numKick = 0; // количество ударов от соперника
	}

	takeDamage(damage) {
		this.numKick++;
		if (this.numKick % 6 === 0 && this.getLuck() > 0.5) {
			damage /= 2;
		}
		super.takeDamage(damage);
	}
}

class Crossbowman extends Archer {
	constructor(obj) {
		super(Object.assign({
			life: 85,
			attack: 8,
			agility: 20,
			luck: 15,
			description: 'Арбалетчик',
			availWeapon: [LongBow, Knife, Arm]
		}, obj));
	}
}

class Demiurge extends Mage {
	constructor(obj) {
		super(Object.assign({
			life: 80,
			magic: 120,
			attack: 6,
			luck: 12,
			description: 'Демиург',
			availWeapon: [StormStaff, Knife, Arm]
		}, obj));
	}

	getDamage(distance) {
		const commonDamage = super.getDamage(distance);
		let coefDemiurge = 1;
		if (this.magic > 0 && this.getLuck() > 0.6) {
			coefDemiurge = 1.5;
		}
		return coefDemiurge * commonDamage;
	}
}


function play(players) {
	// Как я понял задание, необходимо выполнять ходы до тех пор, пока не останется единственный выживший
	let num = 0;
	while (!gameOver) {
		num++;
		console.log(`⌛ Ход ${num}`);
		players.forEach((p, i, arr) => {
			if (!p.isDead()) {
				p.turn(arr);
			}
		});
	}
}


play([
	new Mage({ life: 900, position: 10, name: '🧙‍ Иван', accusativeName: '🧙‍ Ивана'}),
	new Warrior({ life: 900, position: 0, name: '💂 Дима', accusativeName: '💂 Диму'}),
]);

// play([
// 	new Warrior({ life: 1000, position: 10, name: '💂 Иван', accusativeName: '💂 Ивана'}),
// 	new Archer({ life: 1100, position: 25, name: '🧝‍ Ильдар', accusativeName: '🧝‍ Ильдара'}),
// 	new Mage({ life: 1050, position: 15, name: '🧙‍♀️ Ольга', accusativeName: '🧙‍♀️ Ольгу'})
// ]);


// play([
// 	new Warrior({ position: 10, name: '💂 Иван', accusativeName: '💂 Ивана'}),
// 	new Warrior({ position: 12, name: '💂 Олег', accusativeName: '💂 Олега'}),
// 	new Mage({ position: 0, name: '🧙‍ Дима', accusativeName: '🧙‍ Диму'}),
// 	new Archer({ position: 20, name: '🧝‍ Вася', accusativeName: '🧝‍ Васю'}),
// 	new Archer({ position: 25, name: '🧝‍ Ильдар', accusativeName: '🧝‍ Ильдара'}),
// 	new Mage({ position: 15, name: '🧙‍♀️ Ольга', accusativeName: '🧙‍♀️ Ольгу'})
// ]);




const weapon = new Weapon({
	name: 'Старый меч',
	attack: 20,
	durability: 10,
	range: 1
});
// weapon.takeDamage(5);
// console.log(weapon.durability);
// weapon.takeDamage(50);
// console.log(weapon.durability);

const arm = new Arm;
// arm.takeDamage(20);
// console.log(arm.durability);

const sword = new Sword;
// sword.takeDamage(20);
// sword.takeDamage(100);
// console.log(sword.durability);

const bow = new Bow;
// bow.takeDamage(100);
// bow.takeDamage(1000);
// console.log(bow.durability);

const bow2 = new Bow;
// console.log(bow2.getDamage(), bow2.durability);
// bow2.takeDamage(100);
// console.log(bow2.getDamage(), bow2.durability);
// bow2.takeDamage(50);
// console.log(bow2.getDamage(), bow2.durability);
// bow2.takeDamage(150);
// console.log(bow2.getDamage(), bow2.durability);

const stormStaff = new StormStaff({name: 'Уникальное оружие'});
// console.log(stormStaff);






const player = new Player({
	name: 'Иван Демидов'
});
// console.log(player.getLuck());
// console.log(player.getLuck());
// console.log(player.getLuck());
// console.log(player.getLuck());

// console.log(player.getDamage(1));
// console.log(player.getDamage(1));
// console.log(player.getDamage(2));
// console.log(player.getDamage(4));

// player.takeDamage(10);
// console.log(player.life);
// player.takeDamage(80);
// console.log(player.life);
// player.takeDamage(90);
// console.log(player.life);





const warrior = new Warrior();
// console.log(warrior.life, warrior.magic);

// warrior.takeDamage(50);
// console.log(warrior.life, warrior.magic);

// warrior.takeDamage(20);
// console.log(warrior.life, warrior.magic);

// warrior.takeDamage(5);
// console.log(warrior.life, warrior.magic);

// warrior.takeDamage(7);
// console.log(warrior.life, warrior.magic);

// warrior.takeDamage(5);
// console.log(warrior.life, warrior.magic);

// warrior.takeDamage(22);
// console.log(warrior.life, warrior.magic);

// warrior.takeDamage(30);
// console.log(warrior.life, warrior.magic);


const mage = new Mage();
// console.log(mage.life, mage.magic);

// mage.takeDamage(50);
// console.log(mage.life, mage.magic);

// mage.takeDamage(20);
// console.log(mage.life, mage.magic);

// mage.takeDamage(5);
// console.log(mage.life, mage.magic);

// mage.takeDamage(7);
// console.log(mage.life, mage.magic);

// mage.takeDamage(5);
// console.log(mage.life, mage.magic);

// mage.takeDamage(22);
// console.log(mage.life, mage.magic);

// mage.takeDamage(30);
// console.log(mage.life, mage.magic);