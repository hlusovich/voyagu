import {Observable} from 'rxjs';

export interface UseCaseInterfaces<S, T> {
  execute(params: S): Observable<T>;
}

export interface NoParamUseCase< T> {
  execute(): Observable<T>;
}
