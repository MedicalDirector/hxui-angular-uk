import {FilterType} from './filters-type.enum';

export interface IFilterOption {
  label: string;
  value: any;
  icon?: string;
  selected: boolean;
}

export interface IFiltersConfig {

  /**
   * Unique identifier for filter
   */
  id: string;

  /**
   * Filter type, can be SingleSelect, MultiSelect or Search
   */
  type: FilterType;

  /**
   * Label that will appear in a button or search field placeholder
   */
  label: string;

  /**
   * Filter options for Single Select and MultiSelect types
   */
  options?: IFilterOption[];

  /**
   * Filter value for Search filter type
   */
  value?: string;
 /**
   * The original value from corresponding source component
   */
  sourceValue?: any;

  /**
   * Filter character limit for Search filter type
   * Fire filter event if character >= this value
   *  Defaults to 2
   */
  charLimit?: number;

  /**
   * Index of default filter option.
   * The option to set when filters are cleared.
   */
  defaultIndex?: number;
  /**
   * Display mode for type date range picker
   * 1:both tabs 2:custom tab only 3:interval tab only.
   */
  dateRangePicker_displayMode?: number;

  /**
   * Display date format for type date range picker
   */
  dateRangePicker_displayDateFormat?: string;

    /**
   * Width in REM for Search filter type.
   * Defaults if not set
   */
  width?: number;


}
