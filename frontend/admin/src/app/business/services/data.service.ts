import {Inject, Injectable} from '@angular/core';

import {DatePipe, DOCUMENT} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Subject} from 'rxjs/Subject';
import {Session} from '../domain/session';
import {Performance} from '../domain/performance';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Error} from '../domain/error';
import {forkJoin} from 'rxjs/observable/forkJoin';
import {Theater} from "../domain/theater";
import {OrderResponse} from "../domain/responces/orderResponse";

@Injectable()
export class DataService {
  // region Fields
  public loadingFinished = new Subject<void>();
  public dataUpdated = new Subject<void>();
  public errorOccurred = new Subject<Error>();
  public unauthorized = new Subject<string>();

  public orders: OrderResponse[] = [];
  public sessions = {};
  public performances = {};
  public halls = {};
  public theater = null;
  public dataLoaded = false;
  // endregion

  // region Constructor
  constructor(@Inject(DOCUMENT) private document: any,
              private http: HttpClient, private router: Router, private datePipe: DatePipe) {
  }

  // endregion

  private hostUrl = 'http://localhost:8080';
  // private hostUrl = 'http://admin.grani.elumixor.com';
  private baseUrl = `http://localhost:8080/api/`;
  // private baseUrl = 'http://elumixor.com/grani/backend/requests/admin/';


  // private extension = '.admin.php';
  private extension = '';

  // region Get init entities
  /**
   * Initialization function  to get all application entities
   */
  public getApplicationData() {
    console.log('getting application entities');

    const ordersRequest = this.getOrders();
    const sessionsRequest = this.getSessions();
    const hallRequest = this.getHall();
    const theaterRequest = this.getTheater();
    const performancesRequest = this.getPerformances();

    forkJoin([sessionsRequest, ordersRequest, hallRequest, theaterRequest, performancesRequest]).subscribe(() => {
      console.log('Data loaded');
      this.dataLoaded = true;
      this.loadingFinished.next();
    });
  }

  /**
   * GET orders
   */
  public getOrders(propagate = true) {
    return this.http.get(`${this.baseUrl}complex/orders${this.extension}`,
      // {withCredentials: true}
    ).map(
      (response: OrderResponse[]) => {
        console.log('Orders loaded');
        this.orders = response;
        console.log(this.orders);
      })
      .catch((e: any) => Observable.throw(this.httpErrorHandler(e, propagate)));
  }

  /**
   * GET sessions
   */
  public getSessions(propagate = true) {
    return this.http.get(`${this.baseUrl}session${this.extension}`,
      // {withCredentials: true}
    ).map(
      (response) => {
        console.log('Sessions loaded');
        console.log(response);
        this.sessions = response;
        Object.keys(this.sessions).forEach(x => {
          const d = this.sessions[x].date;
          this.sessions[x].date = new Date(d)
        })
      })
      .catch((e: any) => Observable.throw(this.httpErrorHandler(e, propagate)));
  }

  public getHall(propagate = true) {
    return this.http.get(`${this.baseUrl}hall${this.extension}`,
      // {withCredentials: true}
    ).map(
      (response) => {
        console.log('Sessions loaded');
        console.log(response);
        this.halls = response;
      })
      .catch((e: any) => Observable.throw(this.httpErrorHandler(e, propagate)));
  }

  public getTheater(propagate = true) {
    return this.http.get(`${this.baseUrl}theater/first${this.extension}`,
      // {withCredentials: true}
    ).map(
      (response: Theater) => {
        console.log('Sessions loaded');
        console.log(response);
        this.theater = response;
      })
      .catch((e: any) => Observable.throw(this.httpErrorHandler(e, propagate)));
  }

  /**
   * GET performances
   */
  public getPerformances(propagate = true) {
    return this.http.get(`${this.baseUrl}performance${this.extension}`,
      // {withCredentials: true}
    ).map(
      (response: { performances: { id: number, title: string, author: string, description: string, imageUrl: string }[] }) => {
        console.log('Performances loaded');
        console.log(response);
        this.performances = response;
      })
      .catch((e: any) => Observable.throw(this.httpErrorHandler(e, propagate)));
  }

  // endregion

  // region Post/update requests
  //region Ignored for the moment
  /**
   * POST authorization
   * @param {string} login
   * @param {string} password
   * @param {boolean} propagate
   * @returns {Promise<T | ErrorObservable>}
   */
  postSubmit(login: string, password: string, propagate = true) {
    return this.http.post(`${this.baseUrl}authorization${this.extension}`, {
      login: login,
      password: password
    }, {headers: {'Content-Type': ['text/plain']}, withCredentials: true}).map(
      (res) => {
        console.log('logged in', res);
        return this.getApplicationData();
      })
      .catch((e: any) => {
        return Observable.throw(this.httpErrorHandler(e, propagate));
      });
  }

  /**
   * POST logout
   * @returns {Observable<Object>}
   */
  public logout() {
    return this.http.post(`${this.baseUrl}logout${this.extension}`, null,
      {headers: {'Content-Type': ['text/plain']}, withCredentials: true});
  }

  //endregion

  /**
   * POST save resolved/rejected requests
   */
  saveRequests(propagate = true) {
    let request = {};
    this.orders.forEach(o => {
      request[o.id] = o.confirmed;
    });
    return this.http.post(`${this.baseUrl}complex/orders${this.extension}`,
      request,
      // {headers: {'Content-Type': ['text/plain']}, withCredentials: true}
    ).subscribe(
      () => {
        return this.getOrders().subscribe();
      }, error => {
        this.httpErrorHandler(error, propagate);
      });
  }

  /**
   * POST request to delete user, seats etc.
   * @param {number} order
   * @param {boolean} propagate
   */
  deleteViewer(order: number, propagate = true) {
    this.http.post(`${this.baseUrl}deleteUser${this.extension}`,
      {order: order}, {headers: {'Content-Type': ['text/plain']}, withCredentials: true}).subscribe(
      (res) => {
        console.log(res);
        this.sessions = null;
        return this.getSessions().subscribe();
      }, error => {
        this.httpErrorHandler(error, propagate);
      });
  }

  /**
   * POST request to create new session
   */
  createSession(propagate = true) {
    const hall = this.halls[Object.keys(this.halls)[0]];
    const performance = this.performances[Object.keys(this.performances)[0]];
    const session = new Session(null, performance.id, hall.id, new Date());
    console.log(session);
    return this.http.post(`${this.baseUrl}session/new${this.extension}`, session
      // {headers: {'Content-Type': ['text/plain']},withCredentials: true}
    ).subscribe(
      (res: Session) => {
        console.log('New session created', res);
        this.sessions[res.id] = res;
        this.getPerformances().subscribe(() => {
          this.dataUpdated.next();
        });
      }, error => {
        this.httpErrorHandler(error, propagate);
      });
  }

  /**
   * POST request to update session
   * @param {Session} session
   * @param {boolean} propagate
   */
  updateSession(session: Session, propagate = true) {
    console.log(session);
    // console.log(session.date);
    // console.log(this.transformDate(session.date));
    return this.http.post(`${this.baseUrl}session/id/${session.id}${this.extension}`,
      {
        type: 'session',
        performance: session.performance,
        date: session.date,
        hall: session.hall
      },
      // {headers: {'Content-Type': ['text/plain']}, withCredentials: true}
    ).subscribe(
      () => {
        console.log('Session updated');
        this.getPerformances().subscribe(() => {
          this.dataUpdated.next();
        });
      }, error => {
        this.httpErrorHandler(error, propagate);
      });
  }

  /**
   * POST request to delete session
   * @param {Session} session
   * @param {boolean} propagate
   */
  deleteSession(session: number, propagate = true) {
    return this.http.post(`${this.baseUrl}session/delete/${session}${this.extension}`, null
      // {
      // headers: {'Content-Type': ['text/plain']},
      // withCredentials: true
      // }
    ).subscribe(
      (res) => {
        console.log('Session deleted', res);
        this.getSessions().subscribe(() => {
          this.dataUpdated.next();
        });
      }, error => {
        this.httpErrorHandler(error, propagate);
      });
  }

  /**
   * POST request to create new performance
   */
  createPerformance(propagate = true) {
    return this.http.post(`${this.baseUrl}performance/new${this.extension}`, new Performance(null, '[author_name]', '[title]', null, null)


      // {headers: {'Content-Type': ['text/plain']},withCredentials: true}
    ).subscribe(
      (res: Performance) => {
        console.log('New performance created', res);
        this.performances[res.id] = res;
        this.getPerformances().subscribe(() => {
          this.dataUpdated.next();
        });
      }, error => {
        this.httpErrorHandler(error, propagate);
      });
  }


  /**
   * POST request to update performance
   * @param {Performance} performance
   * @param {boolean} propagate
   */
  updatePerformance(performance: Performance, propagate = true) {
    console.log(performance);
    return this.http.post(`${this.baseUrl}performance/id/${performance.id}${this.extension}`,
      {
        type: 'performance',
        title: performance.title,
        author: performance.author
      },
      // {headers: {'Content-Type': ['text/plain']}, withCredentials: true}
    ).subscribe(
      () => {
        console.log('Performance updated');
        this.getPerformances().subscribe(() => {
          this.dataUpdated.next();
        });
      }, error => {
        this.httpErrorHandler(error, propagate);
      });
  }

  /**
   * POST request to delete performance
   * @param {Performance} performance
   * @param {boolean} propagate
   */
  deletePerformance(performance: number, propagate = true) {
    return this.http.post(`${this.baseUrl}performance/delete/${performance}${this.extension}`, null
      // {
      // headers: {'Content-Type': ['text/plain']},
      // withCredentials: true
      // }
    ).subscribe(
      (res) => {
        console.log('Performance deleted', res);
        this.getPerformances().subscribe(() => {
          this.dataUpdated.next();
        });
      }, error => {
        this.httpErrorHandler(error, propagate);
      });
  }

  // endregion

  // region Helpers
  /**
   * Transform javascript date to sql
   * @param {Date} date
   * @returns {string}
   */
  private transformDate(date: Date) {
    console.log(date);
    return this.datePipe.transform(date, 'yyyy-LL-dd HH:mm:ss');
  }

  /**
   * Handler for http errors
   * @param e Error
   * @param {boolean} propagate flag if error should be rethrown
   * @returns {any} Error
   */
  private httpErrorHandler(e, propagate = true) {
    console.warn('Error in http!');
    console.log(e);
    if (e.status === 401) {
      console.warn('Unauthorized');
      this.unauthorized.next('Unauthorized');
    }
    if (propagate) {
      this.errorOccurred.next(Error.map(e));
    }
    return e;
  }

  // endregion
}
