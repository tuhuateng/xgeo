from authlib.integrations.starlette_client import OAuth
from starlette.config import Config
import os

# Load env vars for Auth
# We can load from os.environ directly since we use load_dotenv in main/database
config = Config(environ=os.environ)

oauth = OAuth(config)


# WeChat Configuration
oauth.register(
    name='wechat',
    client_id=os.environ.get('WECHAT_APP_ID'),
    client_secret=os.environ.get('WECHAT_APP_SECRET'),
    authorize_url='https://open.weixin.qq.com/connect/qrconnect',
    authorize_params={'scope': 'snsapi_login'},
    access_token_url='https://api.weixin.qq.com/sns/oauth2/access_token',
    access_token_params={'grant_type': 'authorization_code'},
    userinfo_endpoint='https://api.weixin.qq.com/sns/userinfo',
    client_kwargs={'scope': 'snsapi_login'}
)
