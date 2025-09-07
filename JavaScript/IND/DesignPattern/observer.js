/* 기본 옵저버 패턴 */
class Subject {
    constructor() {
        this.observers = [];
    }

    addObserver(observer){
        this.observers.push(observer)
    }

    notify(data){
        this.observers.forEach((observer) => observer.update(data))
    }
}


class Observer {
    update(data){

    }
}

class EmailObserver extends Observer{
    update(data){
        console.log("이메일 알림:", data);
  }
}

const subject = new Subject;
const observer = new EmailObserver;

subject.addObserver(observer)
subject.notify("observer 추가");

/* 
    새 책이 발행되면 구독자들이 알림받음
*/
class Publisher{
    constructor(){
        this.books = [];
    }

    publishedBooks (book){
        this.books.push(book)
    }

    notify (data) {
        this.books.forEach(book => book.update(data))
    }
    
}

class Subscriber{
    update(data) {

    }
}

class EmailSubScriber extends Subscriber{
    update(data){
        console.log(`이메일로 알려드립니다: ${data}이/가 출판되었습니다.`)
    }
}

const subject1 = new Publisher;
const observer1= new EmailSubScriber;

subject1.publishedBooks("신작")
observer1.update("신작")