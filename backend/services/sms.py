import os
import random
from alibabacloud_dysmsapi20170525.client import Client as Dysmsapi20170525Client
from alibabacloud_tea_openapi import models as open_api_models
from alibabacloud_dysmsapi20170525 import models as dysmsapi_20170525_models

class AliyunSMS:
    def __init__(self):
        self.access_key_id = os.environ.get("ALIYUN_ACCESS_KEY_ID")
        self.access_key_secret = os.environ.get("ALIYUN_ACCESS_KEY_SECRET")
        self.sign_name = os.environ.get("ALIYUN_SMS_SIGN_NAME")
        self.template_code = os.environ.get("ALIYUN_SMS_TEMPLATE_CODE")
        self.client = self.create_client()

    def create_client(self) -> Dysmsapi20170525Client:
        if not self.access_key_id or not self.access_key_secret:
            return None
        config = open_api_models.Config(
            access_key_id=self.access_key_id,
            access_key_secret=self.access_key_secret
        )
        config.endpoint = f'dysmsapi.aliyuncs.com'
        return Dysmsapi20170525Client(config)

    def send_code(self, phone_number: str, code: str) -> bool:
        """
        Send verification code via SMS.
        Returns True if successful, False otherwise.
        """
        # MOCK MODE: If no credentials, just log the code
        if not self.client:
            print(f"[MOCK SMS] To: {phone_number}, Code: {code}")
            return True

        send_sms_request = dysmsapi_20170525_models.SendSmsRequest(
            sign_name=self.sign_name,
            template_code=self.template_code,
            phone_numbers=phone_number,
            template_param=f'{{"code":"{code}"}}'
        )
        
        try:
            response = self.client.send_sms(send_sms_request)
            if response.body.code == 'OK':
                return True
            print(f"[SMS ERROR] {response.body.message}")
            return False
        except Exception as e:
            print(f"[SMS EXCEPTION] {str(e)}")
            return False

    @staticmethod
    def generate_code(length=6) -> str:
        return ''.join([str(random.randint(0, 9)) for _ in range(length)])

sms_service = AliyunSMS()
