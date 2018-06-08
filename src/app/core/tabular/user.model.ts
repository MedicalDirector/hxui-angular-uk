
import {ActionConfigRouteType, IActionsConfig} from '../../../../projects/hx-ui/src/lib/tabular/actions-config.interface';
import {ITabularRow} from '../../../../projects/hx-ui/src/lib/tabular/tabular-row.interface';
import {
  ITabularColumnBadgeType,
  ITabularColumnIconType
} from '../../../../projects/hx-ui/src/lib/tabular/tabular-column.interface';

export class UserModel implements ITabularRow {
  public id: number;
  public usercode: string;
  public firstname: string;
  public surname: string;
  public rolename: string;
  public email: string;
  public flag: ITabularColumnBadgeType;
  public active: boolean;
  public created: Date;
  public modified: Date;
  public selected: boolean;
  public checked: boolean;
  public title: string;
  public info: ITabularColumnIconType;
  public icon: string;
  public actions: IActionsConfig[] = [];


  constructor(data?: any) {
    if (data) {
      Object.assign(this, data);
    }
    this.setIcon();
    this.setActions();
    this.setTitle();
  }

  setIcon() {
   this.icon = (this.active) ? 'icon-check-empty is-primary' : 'icon-close-empty is-danger';
  }

  setActions() {
    this.actions = [
      {
        id: 'row_person_prescription',
        label: 'Prescribe',
        icon: 'icon-prescription',
        route: ['/prescription'],
        routeType: ActionConfigRouteType.Route,
        disabledConfig: {disabled: true, tooltip: 'Not enough permission'}
      },
      {
        id: 'row_person_edit',
        label: 'Edit',
        icon: 'icon-edit',
        routeType: ActionConfigRouteType.Callback,
        callback: [this.onActionClickHandler, 'edit', 1]
      },
      {
        id: 'row_person_delete',
        label: 'Delete',
        icon: 'icon-bin',
        routeType: ActionConfigRouteType.Callback,
        callback: [this.onActionClickHandler, 'delete', 1]
      },
      {
        id: 'row_person_more',
        label: 'More',
        icon: 'icon-more',
        routeType: ActionConfigRouteType.None,
        children: [
          {
            id: 'row_person_prescription',
            label: 'Prescribe',
            route: ['/prescription'],
            routeType: ActionConfigRouteType.Route,
            disabledConfig: {disabled: true, tooltip: 'Not enough permission'}
          },
          {
            id: 'row_person_edit',
            label: 'Edit',
            routeType: ActionConfigRouteType.Callback,
            callback: [this.onActionClickHandler, 'edit', 1]
          },
          {
            id: 'row_person_delete',
            label: 'Delete',
            routeType: ActionConfigRouteType.Callback,
            callback: [this.onActionClickHandler, 'delete', 1]
          }]
      }
    ];
  }

  setTitle() {
    this.title = 'This is a custom title tag for: ' + this.usercode + ':' + this.firstname + ':' + this.surname;
  }



  /**
   * Function used in the callback actions
   * @param type
   * @param data
   */
  onActionClickHandler = (type, data) => {
     alert('You clicked the ' + type + ' button. Arguments:' + type + ' and ' + data);
  }
}
