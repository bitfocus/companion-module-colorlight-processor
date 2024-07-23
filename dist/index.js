"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("@companion-module/base");
const config_1 = require("./config");
const connection_1 = require("./connection");
const state_1 = require("./state");
const log_1 = require("./log");
const actions_1 = require("./actions");
const feedbacks_1 = require("./feedbacks");
class CltProcessor extends base_1.InstanceBase {
    // 配置对象
    config;
    // 连接
    connection;
    // 状态缓存
    state;
    constructor(internal) {
        super(internal);
        this.config = config_1.defaultConfig;
        this.connection = new connection_1.Connection(this);
        const stateContext = {
            triggerFeedbacks: this.checkFeedbacks.bind(this)
        };
        this.state = new state_1.StateCache(stateContext);
        // 初始化日志工具
        (0, log_1.setupLogger)(this.log.bind(this));
    }
    /**
     * 初始化和开启实例
     */
    async init(config, isFirstInit) {
        log_1.logger.info('Init connection instance.');
        if (isFirstInit) {
            this.config = config;
        }
        else {
            log_1.logger.info('Manually update config after init.');
            this.configUpdated(config);
        }
    }
    /**
     * 销毁或关闭实例
     */
    async destroy() {
        this.connection.close();
        log_1.logger.info('Destroy connection instance.');
    }
    /**
     * 初始化操作
     */
    initActions() {
        log_1.logger.info('Init actions.');
        this.setActionDefinitions((0, actions_1.setupActions)(this));
    }
    /**
     * 初始化反馈
     */
    initFeedbacks() {
        log_1.logger.info('Init feedbacks.');
        this.setFeedbackDefinitions((0, feedbacks_1.setupFeedbacks)(this));
    }
    /**
     * 实例配置更新
     */
    async configUpdated(config) {
        this.config = config;
        log_1.logger.info('Config updated.');
        // 简单校验 host 配置项即可
        if (this.config.host) {
            this.connection.open(this.config.host, this.config.port);
        }
        else {
            log_1.logger.error('Host config is empty.');
        }
        this.initActions();
        false && this.initFeedbacks(); // 暂时关闭反馈
    }
    /**
     * 设置配置项
     */
    getConfigFields() {
        return (0, config_1.generateConfigFields)();
    }
    /**
     * 触发反馈
     */
    triggerFeedback(id) {
        this.checkFeedbacksById(id);
    }
    /**
     * 发送数据
     */
    async send(data) {
        return this.connection.send(data);
    }
}
(0, base_1.runEntrypoint)(CltProcessor, []);
