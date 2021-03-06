import React from 'react';
import { withTranslation } from 'react-i18next';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form';
import Cookies from 'universal-cookie';
import $ from "jquery";
import _ from 'lodash';

import { changeLanguage } from 'my-actions/systems/LanguageAction';
import { login } from 'my-actions/systems/AuthAction';

const cookies = new Cookies();
class FormLoginContainer extends React.Component {
    handleChangeLanguage = (e, newValue) => {
        this.props.changeLanguage(newValue)
    };

    handleSubmit = e => {
        this.props.login(this.props.initialValues);
        e.preventDefault();
    };

    render() {
        const { t } = this.props;
        if (cookies.get("isLogin") || this.props.auth.login_status) {
            return <Redirect to="/dashboard" />
        } else if (this.props.auth.login_status === false) {
            $('div.alert').fadeIn()
        }

        return (
            <div className="login" style={{ backgroundColor : 'transparent' }}>
                <div className="content">
                    <div className="logo">
                        <a href="index.html">
                            <img src="/assets/images/logo.png" alt="logo vw3" />
                        </a>
                    </div>
                    <form className="login-form" onSubmit={this.handleSubmit}>
                        <h3 className="form-title font-green">{t("Login to VW3 Application")}</h3>
                        <div className="alert alert-danger display-hide">
                            <button className="close" data-close="alert" />
                            <span> {t(this.props.auth.errors.error_description)} </span>
                        </div>
                        <div className="form-group">
                            <label className="control-label visible-ie8 visible-ie9">{t("Username")}</label>
                            <Field
                                name="username"
                                type="text"
                                component="input"
                                className="form-control form-control-solid placeholder-no-fix"
                                autoComplete="off"
                                placeholder={t("Username")}
                            />
                        </div>
                        <div className="form-group">
                            <label className="control-label visible-ie8 visible-ie9">{t("Password")}</label>
                            <Field
                                name="password"
                                type="password"
                                component="input"
                                className="form-control form-control-solid placeholder-no-fix"
                                autoComplete="off"
                                placeholder={t("Password")}
                            />
                        </div>
                        <div className="form-group">
                            <Field name="lang_code" component="select" className="form-control" onChange={this.handleChangeLanguage}>
                                <option value="en">English</option>
                                <option value="vi">Tiếng Việt</option>
                            </Field>
                        </div>
                        <div className="form-actions text-center">
                            <button type="submit" className="btn green uppercase">{t("Login")}</button>
                        </div>
                    </form>
                </div>
                <div className="copyright"> 2019 © VW3 Application </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        initialValues: _.get(state, 'form.form_login.values', {}),
        auth : state.AuthReducer,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeLanguage: params => {dispatch(changeLanguage(params))},
        login: params => {dispatch(login(params))}
    }
};

export default compose(
    reduxForm({form: 'form_login'}),
    connect(mapStateToProps, mapDispatchToProps),
    withTranslation()
)(FormLoginContainer);
