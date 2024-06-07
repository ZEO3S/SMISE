class Recruitment_counter:
    def __init__(self):
        self.counter = 0
    
    def update(self, num):
        self.counter = num
    
    def get_value(self):
        return self.counter
