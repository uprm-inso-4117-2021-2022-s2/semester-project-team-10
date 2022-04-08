import unittest
import app

class TestingInits(unittest.TestCase):
    def setUp(self):
        self.appli = app

    def test_appInit(self):
        #print(self.appli.db)
        self.assertIsNotNone(self.appli.app, "App is None type. Not init.")

    def test_dbInit(self):
        self.assertIsNotNone(self.appli.db, "DB is None type. Not init.")

if __name__ == "__main__":
    unittest.main()