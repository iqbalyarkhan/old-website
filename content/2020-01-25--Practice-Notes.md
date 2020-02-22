---
date: 2020-01-25
title: Practice Notes
draft: false
extract: Notes as I solve various practice problems
categories: 
    - C++
tags:
    - C++
---
## Table of Contents

1. [Reading whitespace separated numbers](#reading-numbers-separated-by-whitespace)
2. [String Streams](#string-streams)
    * [String to int and back](#int-to-string-and-back)

3. [Declaring a generic object](#declaring-a-generic-object)

4. [STL unordered_set](#stl-unordered-set)

5. [STL stack](#stl-stack)
### Reading numbers separated by whitespace

Say input is:

```css
3 // Number of entries about to follow
5 -10 15 // Each entry
```
This input can be read by using `cin`. Subsequently, you can then loop number of times read and then use `cin` which reads each new number in succession. `cin` reads based on whitespace or new-line. 

```cpp
int main(int argc, const char * argv[]) {
    int num = 0;
    cin >> num;
    int ans = 0;
    for (int i = 0; i < num; i++){
        int curr = 0;
        cin >> curr;
        if (curr < 0){
            ans++;
        }
    }
    
    cout << ans << endl;
    
    return 0;
}
```

### String Streams

#### Int to String and back

To convert an int to string, initialize a `stringstream` object, and read in the integer to this stringstream:

```cpp
ss << num
```

Next, transfer this int to a an empty string:

```cpp
string input;
ss >> input;
```

Do something to input (replace an integer etc) and then write back to the stringstream object. Remember to clear the stringstream object before writing back to it:

```cpp
ss.clear();
ss << input;
```

Now you can transfer this edited string back to an integer:

```cpp
ss >> num;
return num;
```

Direction of flow of information follows the direction of your greater/less than signs:

Going into the stream from string or int:
```cpp
ss << input;
```

Coming out of the stream to string or int:
```cpp
ss >> num;
```

Example:

```cpp
    int maximum69Number (int num) {
        //Initializing stringstream
        stringstream ss;
        //Reading in the integer
        ss << num;
        string input;
        //Transferring int to string input
        ss >> input;
        //Looping over the new string
        for (int i = 0; i < input.length(); i++){
            if (input[i] == '6'){
                input[i] = '9';
                break;
            }
        }
        
        ss.clear();
        ss << input;
        ss >> num;
        cout << "Final num: " << num << endl;
        cout << "num + 1 = " << num + 1 << endl;
        return num;
    }
```

### Declaring a generic object

If you've got a class that is generic and want to initialize a generic object for some reason in that class, use the following syntax:
```cpp
//T is the generic type here:
Vertex<T> v = T();
//You can do the same for ints, strings,chars,bools etc:
int t = int();
bool t = bool(); //and so on...
```

### STL Unordered Set

To use the unordered set, you'd include this header: 
```cpp 
#include <unoredered_set>
```

Then declare an unordered set and  insert:

```cpp
unordered_set<string> s;
s.insert("string one");
```

To check if the set contains an element:


```cpp
auto search = s.find("steing one");
if (search != s.end()){
   cout << "Found item in set" << endl;
} else {
    cout << "Couldn't find item in set" << endl;
}
```

Unordered_set uses [hash table](hash-tables) therefore lookup,insert and deletes would take $O(1)$ time.

### STL Stack

Defined in the 
```cpp 
#include <stack>
``` 
header, you can push on the stack using ```cpp .push() ``` function. You might think that calling the `.pop()` function would return the element that can be captured in a variable, that is not the case:

```cpp
stack<int> s;
s.push(2);
s.push(3);
s.push(4);
int curr = s.pop(); //ERROR -> SINCE POP RETURNS TYPE VOID
``` 

To get the value that is at the top, use `top()` function and then use `.pop()` to remove the top element:

```cpp
stack<int> s;
s.push(2);
s.push(3);
s.push(4);
int curr = s.top(); //Returns top element = 4
s.pop(); //Stack no longer contains 4.
``` 

### STL Queue

Defined in the 
```cpp 
#include <queue>
``` 
header, the queue stl container uses the `.front()` method to get the item at the front of the queue and `.pop()` method actually removes the item in the front of the queue.