import service from 'service';

/**
 * 【登陆接口】
 * @returns {Promise<*>}
 */

// 银行个性配置
export const bankConf = async () => {
	const response = await service.get('/yc/open/conf/bankConf');
	return response.data;
};
// 登陆
export const login = async (params) => {
	const response = await service.post('/api/auth/login', params);
	return response.data;
};

// 退出登陆
export const loginOut = async (params) => {
	const response = await service.post('/api/auth/logout', params);
	return response.data;
};

// 忘记密码-step1
export const forgetPasswordStep1 = async (params) => {
	const response = await service.post('/api/auth/open/forgetPassword/step1', params);
	return response.data;
};


// 忘记密码获取验证短信-step2
export const forgetPasswordStep2Sms = async (params) => {
	const response = await service.get('/api/auth/open/forgetPassword/step2/sms', { params });
	return response.data;
};

// 验证短信验证-step2
export const smsValid = async (params) => {
	const response = await service.post('/api/auth/open/forgetPassword/step2/smsValid', params);
	return response.data;
};

// 忘记密码-step3 修改密码
export const forgetPasswordStep3 = async (params) => {
	const response = await service.post('/api/auth/open/forgetPassword/step3', params);
	return response.data;
};

// userInfo
export const userInfo = async (params) => {
	const response = await service.get('/yc/user/info', { params });
	return response.data;
};

// api/auth/switchOrg
export const switchOrg = async (params) => {
	const response = await service.post('/api/auth/switchOrg', params);
	return response.data;
};

// 修改密码
export const changePassword = async (params) => {
	const response = await service.post('/api/auth/user/changePassword', params);
	return response.data;
};

// 登录前校验
export const loginPreCheck = async (params) => {
	const response = await service.get('/api/auth/open/loginPreCheck', { params });
	return response.data;
};

// 获取手机验证码
export const getVerificationCode = async (params) => {
	const response = await service.get('/api/auth/open/wechat/sms', { params });
	return response.data;
};

// 手机验证码登录
export const loginPhoneCode = async (params) => {
	const response = await service.post('/api/auth/mobileLogin', params);
	return response.data;
};


// 初始账号(初始修改密码) [zhousai]
export const initUser = async (params) => {
	const response = await service.post('/api/auth/initUser', params);
	return response.data;
};

// 获取当前机构 [zhousai]
export const currentOrg = async (params) => {
	if (global.REQ_STATUS) return false;
	const response = await service.get('/api/auth/currentOrg', { params });
	return response.data;
};
