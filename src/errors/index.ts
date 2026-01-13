import i18n from "../../translations";

export class ErrorAuthenticating extends Error {
  constructor() {
    super((i18n.t("error"), i18n.t("errorAuthenticating")));
    this.message;
  }
}

export class ErrorGetting extends Error {
  constructor() {
    super(i18n.t("errorGetting"));
    this.message;
  }
}
