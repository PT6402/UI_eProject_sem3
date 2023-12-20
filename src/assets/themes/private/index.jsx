import { createTheme } from "@mui/material/styles";

// base styles
import colors from "assets/themes/private/base/colors";
import breakpoints from "assets/themes/private/base/breakpoints";
import typography from "assets/themes/private/base/typography";
import boxShadows from "assets/themes/private/base/boxShadows";
import borders from "assets/themes/private/base/borders";
import globals from "assets/themes/private/base/globals";

// helper functions
import boxShadow from "assets/themes/private/functions/boxShadow";
import hexToRgb from "assets/themes/private/functions/hexToRgb";
import linearGradient from "assets/themes/private/functions/linearGradient";
import pxToRem from "assets/themes/private/functions/pxToRem";
import rgba from "assets/themes/private/functions/rgba";

// components base
import sidenav from "assets/themes/private/components/sidenav";
import list from "assets/themes/private/components/list";
import listItem from "assets/themes/private/components/list/listItem";
import listItemText from "assets/themes/private/components/list/listItemText";
import card from "assets/themes/private/components/card";
import cardMedia from "assets/themes/private/components/card/cardMedia";
import cardContent from "assets/themes/private/components/card/cardContent";
import button from "assets/themes/private/components/button";
import iconButton from "assets/themes/private/components/iconButton";
import inputBase from "assets/themes/private/components/form/inputBase";
import menu from "assets/themes/private/components/menu";
import menuItem from "assets/themes/private/components/menu/menuItem";
import switchButton from "assets/themes/private/components/form/switchButton";
import divider from "assets/themes/private/components/divider";
import tableContainer from "assets/themes/private/components/table/tableContainer";
import tableHead from "assets/themes/private/components/table/tableHead";
import tableCell from "assets/themes/private/components/table/tableCell";
import linearProgress from "assets/themes/private/components/linearProgress";
import breadcrumbs from "assets/themes/private/components/breadcrumbs";
import slider from "assets/themes/private/components/slider";
import avatar from "assets/themes/private/components/avatar";
import tooltip from "assets/themes/private/components/tooltip";
import appBar from "assets/themes/private/components/appBar";
import tabs from "assets/themes/private/components/tabs";
import tab from "assets/themes/private/components/tabs/tab";
import stepper from "assets/themes/private/components/stepper";
import step from "assets/themes/private/components/stepper/step";
import stepConnector from "assets/themes/private/components/stepper/stepConnector";
import stepLabel from "assets/themes/private/components/stepper/stepLabel";
import stepIcon from "assets/themes/private/components/stepper/stepIcon";
import select from "assets/themes/private/components/form/select";
import formControlLabel from "assets/themes/private/components/form/formControlLabel";
import formLabel from "assets/themes/private/components/form/formLabel";
import checkbox from "assets/themes/private/components/form/checkbox";
import radio from "assets/themes/private/components/form/radio";
import autocomplete from "assets/themes/private/components/form/autocomplete";
import input from "assets/themes/private/components/form/input";
import flatpickr from "assets/themes/private/components/flatpickr";
import swal from "assets/themes/private/components/swal";
import container from "assets/themes/private/components/container";
import popover from "assets/themes/private/components/popover";
import buttonBase from "assets/themes/private/components/buttonBase";
import icon from "assets/themes/private/components/icon";
import svgIcon from "assets/themes/private/components/svgIcon";
import link from "assets/themes/private/components/link";
import dialog from "assets/themes/private/components/dialog";
import dialogTitle from "assets/themes/private/components/dialog/dialogTitle";
import dialogContent from "assets/themes/private/components/dialog/dialogContent";
import dialogContentText from "assets/themes/private/components/dialog/dialogContentText";
import dialogActions from "assets/themes/private/components/dialog/dialogActions";

const theme = createTheme({
  breakpoints: { ...breakpoints },
  palette: { ...colors },
  typography: { ...typography },
  boxShadows: { ...boxShadows },
  borders: { ...borders },
  functions: {
    boxShadow,
    hexToRgb,
    linearGradient,
    pxToRem,
    rgba,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ...globals,
        ...flatpickr,
        ...swal,
        ...container,
      },
    },
    MuiDrawer: { ...sidenav },
    MuiList: { ...list },
    MuiListItem: { ...listItem },
    MuiListItemText: { ...listItemText },
    MuiCard: { ...card },
    MuiCardMedia: { ...cardMedia },
    MuiCardContent: { ...cardContent },
    MuiButton: { ...button },
    MuiIconButton: { ...iconButton },
    MuiInputBase: { ...inputBase },
    MuiMenu: { ...menu },
    MuiMenuItem: { ...menuItem },
    MuiSwitch: { ...switchButton },
    MuiDivider: { ...divider },
    MuiTableContainer: { ...tableContainer },
    MuiTableHead: { ...tableHead },
    MuiTableCell: { ...tableCell },
    MuiLinearProgress: { ...linearProgress },
    MuiBreadcrumbs: { ...breadcrumbs },
    MuiSlider: { ...slider },
    MuiAvatar: { ...avatar },
    MuiTooltip: { ...tooltip },
    MuiAppBar: { ...appBar },
    MuiTabs: { ...tabs },
    MuiTab: { ...tab },
    MuiStepper: { ...stepper },
    MuiStep: { ...step },
    MuiStepConnector: { ...stepConnector },
    MuiStepLabel: { ...stepLabel },
    MuiStepIcon: { ...stepIcon },
    MuiSelect: { ...select },
    MuiFormControlLabel: { ...formControlLabel },
    MuiFormLabel: { ...formLabel },
    MuiCheckbox: { ...checkbox },
    MuiRadio: { ...radio },
    MuiAutocomplete: { ...autocomplete },
    MuiInput: { ...input },
    MuiOutlinedInput: { ...input },
    MuiFilledInput: { ...input },
    MuiPopover: { ...popover },
    MuiButtonBase: { ...buttonBase },
    MuiIcon: { ...icon },
    MuiSvgIcon: { ...svgIcon },
    MuiLink: { ...link },
    MuiDialog: { ...dialog },
    MuiDialogTitle: { ...dialogTitle },
    MuiDialogContent: { ...dialogContent },
    MuiDialogContentText: { ...dialogContentText },
    MuiDialogActions: { ...dialogActions },
  },
});
export default theme;
