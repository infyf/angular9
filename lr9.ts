import { Session } from './session';

export interface ConferenceInterface {
    addSession(session: Session.SessionInterface): void;
    getName(): string;
    getLocation(): string;
    getSessions(): Session.SessionInterface[];
    getAverageAttendees(): number;
    getSessionWithLeastAttendees(): Session.SessionInterface;
    getLongestSessionTopic(): string;
}

export class Conference implements ConferenceInterface {
    private sessions: Session.SessionInterface[];

    constructor(private name: string, private location: string) {
        this.sessions = [];
    }

    addSession(session: Session.SessionInterface): void {
        this.sessions.push(session);
    }

    getName(): string {
        return this.name;
    }

    getLocation(): string {
        return this.location;
    }

    getSessions(): Session.SessionInterface[] {
        return this.sessions;
    }

    getAverageAttendees(): number {
        let totalAttendees = 0;
        this.sessions.forEach(session => {
            totalAttendees += session.getAttendees();
        });
        return totalAttendees / this.sessions.length;
    }

    getSessionWithLeastAttendees(): Session.SessionInterface {
        return this.sessions.reduce((prev, current) => prev.getAttendees() < current.getAttendees() ? prev : current);
    }

    getLongestSessionTopic(): string {
        let longestTopic = '';
        this.sessions.forEach(session => {
            if (session.getTopic().length > longestTopic.length) {
                longestTopic = session.getTopic();
            }
        });
        return longestTopic;
    }
}

Лістинг коду : Session
export namespace Session {
    export interface SessionInterface {
        getDate(): string;
        getTopic(): string;
        getAttendees(): number;
    }

    export class Session implements SessionInterface {
        constructor(private date: string, private topic: string, private attendees: number) {}

        getDate(): string {
            return this.date;
        }

        getTopic(): string {
            return this.topic;
        }

        getAttendees(): number {
            return this.attendees;
        }
    }
}
Лістинг коду : main
import { Session } from './session';
import { Conference, ConferenceInterface } from './conference';

const conference = new Conference("IT Conference", "Миколаїв");
conference.addSession(new Session.Session("2024-04-15", "Основи роботи з Angular", 50));
conference.addSession(new Session.Session("2024-04-16", "Тестування з програмного продукту", 45));
conference.addSession(new Session.Session("2024-04-17", "Найновіші тренди у веброзробці", 55));

console.log(`Конференція "${conference.getName()}", Місце проведення: ${conference.getLocation()}`);
console.log("Список засідань:");
conference.getSessions().forEach((session, index) => {
    console.log(`  ${index + 1}. ${session.getTopic()} (${session.getDate()}) - ${session.getAttendees()} учасників`);
});
console.log(`Середня кількість учасників на засіданні: ${conference.getAverageAttendees()}`);
console.log(`Засідання з найменшою кількістю учасників: ${conference.getSessionWithLeastAttendees().getTopic()} (${conference.getSessionWithLeastAttendees().getAttendees()} учасників)`);
console.log(`Тема з найдовшою назвою: ${conference.getLongestSessionTopic()}`);
?
