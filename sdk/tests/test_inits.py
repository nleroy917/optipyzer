import optipyzer

def test_create_api():
    api = optipyzer.API()
    assert api
    assert api.api_base == optipyzer.PUBLIC_SERVER_BASE