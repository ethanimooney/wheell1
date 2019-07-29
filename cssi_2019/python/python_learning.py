#
#INPUTS
#

# name = raw_input("What's your name?\n")
# age = raw_input("How old are you?\n")
# print(name + " is " + age + " years old! Nice!")
# years_to_retirement = 67 - int(age) #Have to convert age to int
# print("You can retire in " + str(years_to_retirement) + " years!")

# Create a new program that asks user for their age, print year they were born ... roughly

# age = raw_input("How old are you?\n")
# birthdate = 2019 - int(age)
# print("You were born in " + str(birthdate) + "!")


#
#CONDITIONALS
#if, elif, else
#

# num = int(raw_input("Enter a number\n"))
#
# if num > 0:
#     print("Positive number")
# elif num < 0:
#     print("Negative number")
# else:
#     print("Number is zero")

# Use conditionals to tell a user whether number entered is even or odd

# num = int(raw_input("Enter a number\n"))
#
# if num == 0: #Checks if number is non-zero before continuing
#     print("Number is 0")
# else:
#     if num % 2 == 0:
#         print("Even number")
#     else:
#         print("Odd number")

#
#CONDITIONALS-Nesting
#

# age = int(raw_input("How old are you?\n"))
#
# if age >= 18:
#     print("You can vote!")
#     if age >= 25:
#         print("You can also rent a car!")
#         if age >= 36:
#             print("You can ALSO run for president! DO IT")
#         else:
#             print("But you can't run for president. :(")
#     else:
#         print("But you can't rent a car. :(")
# else:
#     print("You can't vote. :(")


#
# LOOPS
#

#LOOPS - for

# for i in range(10):
#     print(i)

#LOOPS - while

# index = 0
# while index < 10:
#     print(index)
#     index+= 1

#WORD SHOUTER
#Write a program that asks user for a word, print word out one letter at a time in all caps

# word = raw_input("Enter a word or phrase: ")

# for i in range(len(word)):
#     print(word[i].upper())

#WORD SHOUTER -  Easier way

# word = raw_input("Enter a word or phrase: ")
#
# for letter in word:
#     print(letter.upper())

#LOOPS -  More while loop usage

# reply = ""
#
# while reply != "stop": #loop only stops when user enters 'stop'
#     reply = raw_input("Enter a messgage [type stop to quit]:\n")
#     print(reply.lower())

#WAVE OF STARS
#Write a program that prints out a wave of stars per user input number and height :
# i.e:
# number = 2:
#height = 3
# *
# **
# ***
# **
# *
# **
# ***
# **
# *
#
# number = int(raw_input("Enter a number:\n"))
# height = int(raw_input("Enter a height:\n"))
#
# indexUp = 1
# indexDown = height - 1
#
# if height == 0 or number == 0:
#     print("Missing value, run again.")
# else:
#     for i in range(number):
#
#         while indexUp < (height + 1):
#             print(("*" * indexUp))
#             indexUp += 1
#         while indexDown != 0:
#             print(("*" * indexDown))
#             indexDown -= 1
#         indexUp = 2
#         indexDown = height - 1

# Factorial - NOT DONE
#
# num = int(raw_input("Enter a number:\n"))
# result = num
#
# for i in range(num):
#     result = result * (num * i)
#
# print(result)


#
# FUNCTIONS
#

# def coolFunction(argument1, argument2): #general function definition
#     does some stuff

# def bondGreeting(firstName, lastName):
#     # print(lastName + ", " + firstName + " " + lastName + ".")
#     # return lastName + ", " + firstName + " " + lastName + "."
#     return '%s, %s %s' % (lastName,firstName,lastName)
#
# print(bondGreeting("Vi", "Pham"))


#
#LISTS
#

# def sumTwoElements(listOfNumbers):
#     sum = 0
#
#     if len(listOfNumbers) < 2:
#         print("Please enter more numbers into the list.")
#     else:
#         for item in range(2):
#             sum = sum + listOfNumbers[item]
#     return str(sum)
#
# print(sumTwoElements([2, 5, 10]))
#
# def sumNo13(listOfNumbers):
#     sum = 0
#
#     if not listOfNumbers:
#         print("Well.. there isn\'t anything to sum so add some numbers for me to add!")
#     else:
#         for i in range(len(listOfNumbers)):
#             if listOfNumbers[i] == 13:
#                 continue
#             else:
#                 sum = sum + listOfNumbers[i]
#     return str(sum)
#
# print(sumNo13([2, 13, 5]))
#
# def hasTwoCats(listOfWords):
#     if listOfWords.count("cat") >= 2:
#         return "True"
#     else:
#         return "False"
#
# print(hasTwoCats(["cat", "dog", "bird"]))
# print(hasTwoCats(["cat", "cat", "bird"]))
#
# def fillWithLarger(listOfInts):
#     largest = 0
#     if listOfInts[0] > listOfInts[len(listOfInts) - 1]:
#         largest = listOfInts[0]
#         for i in range(len(listOfInts)):
#             listOfInts[i] = largest
#     else:
#         largest = listOfInts[len(listOfInts) - 1]
#         for i in range(len(listOfInts)):
#             listOfInts[i] = largest
#
#     return listOfInts
#
# print(fillWithLarger([2, 3 ,5]))
#


#
#DICTIONARIES
#

# passwords = dict()
#
# passwords['jordan'] = 'my_cool_password'
# passwords['seemong'] = 'my_cooler_password'
#
# cleaner_passwords = {
#     'jordan': 'my_cleaner_password',
#     'seemong': 'my_even_cleaner_password', #python doesn't care if you have the extra comma on the end
# }
#
# print(cleaner_passwords['jordan'])
#
# categories = dict()
#
# categories['food'] = ['burgers', 'strawberries', 'chicken', 'milkshakes', 'coffee',] #python is cool with mixixng data types in lists/dictionaries
# categories['games'] = ['CoD', 'Halo', 'Dynasty Warriors', 'Last of Us', 'Teletubbies Unleashed',]
#
# print(categories)

# people = {
#     2: {
#         'age': 18,
#         'name': 'Ethan',
#         'birth_place': 'Colombia, MO',
#         'birthday': "21 November 2000",
#         'favorite_color': 'orange',
#         'eye_color': 'green',
#         'hair_color': 'brown',
#         'graduation_year': 2023
#     },
#     256: {
#         'name': 'See Mong',
#         'height': 70,
#         'birthday': 'some birthday'
#     }
# }
# for thing in person.iteritems(): # prints in pairs
#     print(thing)
#
# for key, value in person.iteritems(): # prints each item basically
#     print('key: ' + key)
#     print('value: ' + str(value))

# for thing in sorted(person):
#     print(thing)
#
# for id in people:
#     person = people[id]
#     print(person['name'] + '\'s birthday is ' + person['birthday'])

#
# passwords = dict()
#
# passwords['jordan'] = 'my_cool_password'
# passwords['seemong'] = 'my_cooler_password'
#
# passwords['jordan'] = 'my new, more secure passoword'
#
# print(passwords)
#
# new_password = {
#     'raw_string': 'my_new_password',
#     'hash_value': 42,
#     'date': '1 July 1977',
# }
#
# passwords['jordan'] = new_password
#
# print(passwords)
#
# for password in passwords.values():
#     if password["date"] < '1 July 2019':
#         print('Reset password')
#

#.open() -> ("file name", "what you want to do with it") -> 'r' = read, 'w' = write, 'a' = append
#.strip() -> removes special things such as new line characters from BOTH ENDS of strings
#.split() -> ("what character you want to split string at") -> splits strings at specified character


#
#OBJECTS
#

class Dog(object):
    def __init__(self, name, age, breed, is_cute):
        #member variables
        self.name = name
        self.age = age
        self.species = 'Dog'
        self.breed = breed
        self.is_cute = is_cute
        self.is_hungry = False
        self.is_tired = False
        self.is_happy = True

    def __str__(self):
        return 'A Dog with the name ' + self.name
    #member functions
    def play(self):
        self.is_happy = True
        self.is_tired = True
        self.is_hungry = True
    def speak(self):
        if (self.is_happy):
            print('Bark! bark!')
        else:
            print("Grrrrr...")

    def goToVet(self):
        self.is_happy = False

petey = Dog('Petey', 9, 'Corgi', True)

print(petey)

petey.speak()
petey.goToVet()
petey.speak()

class Counter(object):
    def __init__(self): #initializes self
        self.value = 0

    def get(self): #returns current value
        return self.value

    def increment(self): #increments self by one
        self.value += 1

    def incrementBy(self, number): #increments self by given number
        self.value += number

    def merge(self, other): #merges self with another number or counter
        self.value = self.value + other.value

    def countDogAge(self, dog): #adds dog age to current self value
        self.value += dog.age

c1 = Counter()
c2 = Counter()

c1.increment()
c1.increment()

c2.increment()

c2.merge(c1)

c2.countDogAge(petey)

print(c1.get())
print(c2.get())











#
