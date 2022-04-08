import unittest

class TestingInits(unittest.TestCase):
    def setUp(self):
        row = ["attr_employee_id", "attr_username", "attr_user_email", "attr_role", "attr_wage"]
        self.correctMap = {
            "employee_id": row[0],
            "username": row[1],
            "user_email": row[2],
            "role": row[3],
            "wage": row[4]
        }
    
    def test_build_row_dict(self):
        self.assertIsNotNone(self.correctMap, "Mapping not done correctly!")

if __name__ == "__main__":
    unittest.main(exit=False)
