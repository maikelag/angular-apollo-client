import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { RouterReducerState, routerReducer, StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';

import { errorReducer, ErrorState } from './reducers/errors.reducer';
import { AuthEffects } from './effects/auth.effect';
import { AuthState, authReducer } from './reducers/auth.reducer';
import { RouterStateUrl, CustomSerializer } from './reducers/router.reducer';

export interface AppState {
  error: ErrorState;
  auth: AuthState;
  router: RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<AppState> = {
  error: errorReducer,
  auth: authReducer,
  router: routerReducer
};

export const effects = [AuthEffects];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument(),
    StoreRouterConnectingModule
  ],
  providers: [
    {
      provide: RouterStateSerializer,
      useClass: CustomSerializer
    }
  ]
})
export class AppStoreModule {}
