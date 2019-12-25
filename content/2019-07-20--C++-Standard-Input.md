---
title: C++ Standard input 
date: 2019-07-20
categories: 
  - C++
tags:
  - C++
  - streams
excerpt:
  - Common methods to extract input from user and its nuances
---

In this post I'll talk about some of the common methods to extract input from the user along with best practices and examples. There are plenty of resources on the web that talk about common techniques, this blog chronicles my journey (mostly headaches) while getting user input for specific scenarios.

### Streams

One of the main operations one can do while programming is interacting with the data. This could be importing data from various sources and using it in your program or displaying some data to the user. To do so, in C++, we use the **streams library**.

A **stream** can be considered a form of communication between the program and the user. There are various different types of streams that are discussed below

#### cout and stream insertion operator

**cout** or **c**haracter **out**put is used to display data from program to the console. cout is used in conjuction with the stream insertion operator: **<<** like so:

```cpp
    cout << "Hello" << endl;
```

The above line first pushes `Hello` to the character out (cout) stream and then pushes the newline, `endl` , to cout.

cout can be used to **chain** data as we push to the console like so:

```cpp
  string name = "You";
  cout << "Hello " << name << endl;
  //Prints:
  Hello You
```

#### cin and stream extraction operator

**cin** or **c**haracter **in**put operator reads values from the user or extracts them.

Example:

```cpp
  int num;
  cout << "Enter your favorite number: " << endl;
  cin >> num; //cin and stream extraction
  cout << "Your favorite number is: " << num << endl;
```

Like cout, cin can be chained as well:

```cpp
  string name;
  int age;
  cout << "Enter your name and age: " << endl;
  cin >> name >> age; //Cplus, 20
  cout << name << " is " << age << " years old." << endl;
  //Prints: Cplus is 20 years old.
```

#### Streams and error handling

If you're reading input from user, you'd have to make sure that the data provided by the user is correct. If not, our stream would enter a fail state which have to be handled manually. For example, consider this code where we're asking user for an integer:

```cpp{numberLines}
#include <stdio.h>
#include <iostream>
#include <string>

using namespace std;

int main(){
    int myInt;
    cout << "Enter int: " << endl;
    cin >> myInt;
    if (cin.fail()){
        cout << "Failed to read, cleaning up cin" << endl;
        cin.clear();
        cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
    } else {
        cout << "No issues, you entered: " << myInt << endl;
    }
    int newInt;
    cout << "Enter newInt: " << endl;
    cin >> newInt;
    cout << "New int is: " << newInt << endl;
}
```

On line 10, if we enter a string instead of an int, we'd enter the check on line 11:

```cpp{numberLines:11}
    if (cin.fail()){
        cout << "Failed to read, cleaning up cin" << endl;
        cin.clear();
        cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
    }
```

In this block we're doing 2 things: one, we're clearing the fail state by calling `cin.clear()`. This call clears the error flag on cin. Through this, we've manually reset the error flag so that future `cin` operations are successful. But before we can get further input via `cin`, we also need to extract the input and discard it that caused the error to occur in the first place. 

This is done via line 14:
```cpp{numberLines:14}
        cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
```

Here, we're asking `cin` to ignore the entire stream that was entered by the user. If you had only used this:
```cpp
        cin.ignore();
```

by default, `cin` would've only ignored a single character. A simple `cin.ignore()` would've worked fine if you were sure that the user would type a single character (say `s` instead of an integer). In that case, we would've printed the error message and then waited at line 19:

```cpp{numberLines:19}
    cout << "Enter newInt: " << endl;
```

for the user to enter a new integer. However, if the user had entered more than one character, say `hola`, then the ignore would've ignored only the first character `h` in `hola` and carried over the `ola` to the next `cin` read. Thus, when we would've encountered the cin on line 20:

```cpp{numberLines:20}
      cin >> newInt;
```

`cin` wouldn't wait for us to type a number and would use garbage value to populate `newInt`. 

Thankfully, by defining `cin.ignore()` the way we have, we can ignore the entire stream in case the user typed out a novel instead of providing us with an integer. Therefore, if you would've entered a long string in place of an integer, you would've seen this output:

```
Enter int: 
hola
Failed to read, cleaning up cin
Enter newInt: 
```

Here is another example showing what would happen if you entered wrong input:

```cpp{numberLines}
#include <stdio.h>
#include <iostream>
#include <string>

using namespace std;

int main(){
    int myInt;
    double myDouble;
    cout << "Enter an int: " << endl;
    cin >>myInt;
    cout <<"Enter a double: " << endl;
    cin >> myDouble;
    cout << "Int: " << myInt << endl;
    cout << "Double: " << myDouble << endl;
    
}
```

If I entered a double for `myInt`, `cin` would extract the number before the period and then would assign the decimal part after the period to `myDouble` without waiting for me to provide the value for `myDouble`.

```
Enter an int: 
2.178
Enter a double: 
Int: 2
Double: 0.178
Program ended with exit code: 0
```

#### getline(): A different approach

Another way to get input from user is to use the **getline** method.

**getline()** reads characters from a stream until a newline character is encountered and stores the read characters (minus the newline) in a string. For example:

```cpp{numberLines}
  string input;
  getline(cin,input);
```
getline() gets you the entire input entered by the user and then allows you to process the input however you want. We'll talk more about getline in a coming section.

#### Reading from files

Most common method to import large quantities of data into your program is to read it from a file. To do so, we'll use the header file called **f**ile **stream**: `<fstream>`. This header file includes `ifstream` and `ofstream` (input file stream and output file stream) to read from and write to files.

Unlike `cin` and `cout` which are **stream objects**, `ifstream` and `ofstream` are types (like int, bool, string, double) which means you need to declare it to use it. Once declared and initialized, you can then use it like `cin` and `cout`.

Here is a simple example of how to use `fstream` to read from a file. Say, our file has a single double on the first line:

```text
23.4
```

```cpp
#include <fstream>
#include <stdio.h>

int main(){
  //Declaring ifstream object
  ifstream input("inputFile.txt");
  //Using it like cin 
  double num;
  input >> num;
  cout << "Num read is: " << num << endl;
  //Prints: 23.4
}
```

If you're reading the input file name from the user, it is easy to see how you'd open a file for reading in that case. This something that I've done in the [Binary Search](/post/binary-search#code) post. A simpler example could be:

```cpp
  //Declaring string to hold file name
  string fileName;
  //Declaring ifstream object
  ifstream input;
  //Extracting file name from user
  cin >> fileName;
  //Opening file with the given file name.
  input.open(fileName);  
```

One thing you should've noticed is that `ifstream` is similar to `cin` in that they both use stream extraction operators which makes sense since we're extracting data from a source and using it inside our program.

Now that we've seen how to open a file, we must also make sure we handle any errors we encounter while opening a file for reading. To do so, we'd use the following convention:

```cpp
  ifstream input("inputFile.txt");
  if (!input.is_open())
    cout << "Couldn't open input file" << endl;
```

This would ensure that we'd only proceed with reading the file if it was opened successfully.

#### Reading till end of file

The example I gave in the previous section is quite trivial, we're getting one value from the file and displaying it. Usually, we're unaware of the number of lines in our file. Sure, we can open the file and count, it is quite a tedious thing to do. 

Therefore, we need a way to read till the end of file is reached. Say for example, we've got a file that has integers on each new line. We want to read the file and populate a vector with those integers. To read such a file we can:

```cpp{numberLines}
vector<int> v;
ifstream fileStream;
fileStream.open(fileName);
if (!fileStream.is_open()){
    cout << "Couldn't open file: " << fileName << endl;
} else {
    while (true){
        int num = 0;
        fileStream >> num;
        if (fileStream.fail()){
            break;
        }
        v.push_back(num);
    }
}
```

Line 9 would fail once we've encountered the end of file.

What if, our file has two pieces o data, on the same line separated by whitespace like so:
```
Sam 21
Bob 25
Jill 23
```

Simple, we'd modify the code block above by adding 2 variables to read our data:

```cpp{numberLines}
ifstream fileStream;
fileStream.open(fileName);
if (!fileStream.is_open()){
    cout << "Couldn't open file: " << fileName << endl;
} else {
    while (true){
        string name = "";
        int age = 0;
        fileStream >> name >> age;
        if (fileStream.fail()){
            break;
        }
    }
}
```


#### Stringstreams

Like console (cin,cout) and file streams, stringstreams are stream objects. Stringstreams allow us to store data in temporary string buffers.

Example usage:

```cpp{numberLines}
  #include<sstream>
  .
  .
  .

  stringstream ss;
  int myInt;
  string myStr;
  double myDouble;

  ss << "21 hello! 3.127";
  ss >> myInt >> myStr >> myDouble;
```

The code above is quite self explanatory. Notice however the clean data input, and how the data is delimited by white-spaces.

#### Our own GetInt() method

Say we now want to write our own `GetInt()` method using the techniques we've seen so far. To do so, we'd have to:
- read input from the user
- make sure it is an integer
- make sure there are no extra characters AFTER the integer

To accomplish this, we can use `getline()` and `stringstream` together:

```cpp{numberLines}
  string userInput;
  while (true){
    stringstream ss;
    getline(cin,userInput);
    int num;
    if (ss >> result){
      //We received an integer, good
      string extra; //to check if anything was entered AFTER the int
      if (ss >> extra){
        cout << "Unexpected " << extra << " after the integer." << endl;
      } else {
        //ONLY an int was entered, we're good.
        return result;
      }
    } else {
      //We didn't receive an integer
      cout << "Please enter an integer" << endl;
    }
    cout << "Retry: " << endl;
  }
```

One caveat above: I've initialized a new stringstream inside the while loop. This is because re-using stringstreams from previous runs cause severe headaches as documented [here](https://stackoverflow.com/questions/24269167/unexpected-stringstream-behavior)