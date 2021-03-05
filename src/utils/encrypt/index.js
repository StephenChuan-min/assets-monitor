import { JSEncrypt } from 'jsencrypt';

const publicKey = `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDle/hFqi80v633AqkjnkZPzVu2
waST+cNVe1gEcDNq6tifFpjjyfXXAEtXD8pAAv6zl0nuFFT9CSOPuAq0kdUc70vT
1jxTMkK0H9iZ74pN4zTu1gsG+RrIcMHKjFFsBrF/D2dI4TJ4ZjMhcxcXuTsNHJ0q
H5e2bLq6VSELhY5PzQIDAQAB`;

const rsaEncrypt = (str) => {
	const encrypt = new JSEncrypt();
	encrypt.setPublicKey(publicKey);
	const result = encrypt.encrypt(str);
	return result;
};

export default rsaEncrypt;
