import I18n from "../../translations";

export class ErrorAuthenticating extends Error {
  constructor(message) {
    super(I18n.t("errorAuthenticating"));
    this.message;
  }
}

export class ErrorGetting extends Error {
  constructor(message) {
    super(I18n.t("errorGetting"));
    this.message;
  }
}
