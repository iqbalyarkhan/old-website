---
date: 2020-01-25
title: Practice Notes
thumbnail: /post-images/notes.png
draft: true
extract: Notes as I solve various practice problems
categories: 
    - DS&A
tags:
    - C++
---
## Table of Contents

1. [Reading whitespace separated numbers](#reading-numbers-separated-by-whitespace)
2. [String Streams](#string-streams)
    * [String to int and back](#int-to-string-and-back)
    * [Char to string](#char-to-string)
    
3. [All Substrings in a string](#all-substrings-in-a-string)

3. [Declaring a generic object](#declaring-a-generic-object)

4. [STL unordered_set](#stl-unordered-set)

5. [STL Map](#stl-map)

6. [STL Multi Map](#stl-multi-map)

6. [STL Unordered Map](#stl-unordered-map)

5. [STL stack](#stl-stack)

6. [STL Queue](#stl-queue)

6. [Vectors](#vectors)

    * [Initialize a vector](#initialize-a-vector)

    * [Erase from vectors](#erase-from-vectors)
    
    * [Vector of vectors](#vector-of-vectors)
    
    * [Assign and vectors](#assign-and-vectors)

7. [C++ Ternary Operator](#c-ternary-operator)

8. [Pair](#pair)

9. [Tuple](#tuple)

10. [Setting an integer to infinity](#setting-an-integer-to-infinity)

11. [Char to int](#char-to-int)

12. [ASCII to char](#ascii-to-char)

13. [Int to Char](#int-to-char)

14. [Character to upper case](#character-to-upper-case)

15. [Use of Random and related ideas](#use-of-random-and-related-ideas)

13. [Interesting Problems](#interesting-problems)
    * [Single Numbers](#single-numbers)
    * [Reverse an integer](#reverse-an-integer)
    * [Reverse a string](#reverse-a-string)
    * [Check if a decimal integer is a palindrome](#check-if-a-decimal-integer-is-a-palindrome)
    * [Find difference in string](#find-difference-in-string)
    * [Destination city](https://leetcode.com/problems/destination-city/)

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

#### Char to string

```cpp
    char c = 'A';
	// using stringstream
	std::string s;
	std::stringstream ss;
	ss << c;
	ss >> s;	
```

An easier way to convert char to string is using the string constructor that takes the size of your new string and the character:

```cpp
char c = 'c';
string s(1,c);
```

### All substrings in a string
**Print all substrings within a string**

This is quite a frequent problem where we're to determine substrings within a string. To do so, there's a simple technique:
```cpp
0   1   2
a   b   c

```

We start with the first character and print it. Next, we move to character 1 and print characters from 0 - 1. We continue until we're out of characters to print.

The example above would print these substrings:

```cpp
a
ab
abc
b
bc
c
``` 

Now, to convert this logic to code, we can do this: 
- Have two loops: an outer loop that determines the starting character for our current substring. This outer loop would choose `a`, then `b` and then `c`. 
- An inner loop to determine the length of the current substring. It'd have to start with 0, then 1 and so on until the last character of our string. To do so, we'll use the `substr()` method provided by C++ STL. `substr()` takes in the starting position of the new substring and the length of substring desired. 

```cpp
void printSubstrings(string s) {
    for (int i = 0; i < s.size(); i++){
        for (int len = 1; len <= s.size() - i; len++){
            string curr = s.substr(i, len);
            cout << curr << endl;
        }
    }
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
#include <unordered_set>
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

Unordered_set uses [hash table](/hash-tables) therefore lookup,insert and deletes would take $O(1)$ time.

### STL Map
In a map, the elements are sorted by key and lookup is $O(log N)$ as the standard library uses balanced trees behind the scenes. Ordered map is defined in the

```cpp
#include <map>
```

header. Once defined, you can declare a map with data type and populate it like so:

```cpp
map<string, int> m;
m["one"] = 1;
m["two"] = 2;
m["3"] = 3;
m["four"] = 4;
```

To check if key exists:

```cpp
if (m.find("four") != m.end()){
   cout << "Found it!" << endl;
}
```
To print use the `auto` keyword:

```cpp
//print the map:
for (auto it: m){
    cout << "Key: " << it.first << " Value: " << it.second << endl;
}
```

Output would be printed in sorted order based on key:

```
Key: four Value: 4
Key: one Value: 1
Key: three Value: 3
Key: two Value: 2
```

If you're using STL map and want to search for an item, you can use the `lower_bound()` function call. The `lower_bound()` call returns the next largest value based on key. Example:

```cpp

    13
   /  \
  11  14  
 / \
9  12
```

and if you make this call: 
```cpp
auto it = myMap.lower_bound(11);
```

`it` would be pointing to 12. You can then move the iterator forward or backward as well (using `it++` and `it--`).

To check if your iterator is at the end or the beginning of the map you can do:
```cpp
if (it != myMap.begin() && it != myMap.end()){
    //....
}
```


### STL Multi map

Map above does not allow duplicates, it will overwrite existing values if you add a duplicate. To allow for duplicates, use multi-map. multimap doesn't allow for subscript insertion, you'd have to use the `insert` method:
```cpp
multimap<int,int> m;
m.insert({2,3});
```

Multimap will automatically store elements in sorted order by key.


### STL Unordered Map

Defined in the 
```cpp
#include <unordered_map>
```
header, `unordered_map` uses hash table behind the scenes for $O(1)$ insert, find and delete operations. Similar to `map`, here is the syntax for insert, find and print:

```cpp
int main(){
    unordered_map<string, int> m;
    m["one"] = 1;
    m["two"] = 2;
    m["three"] = 3;
    m["four"] = 4;
    
    if (m.find("four") != m.end()){
        cout << m["four"] << endl;
    } else{
        cout << "not found" << endl;
    }
    
    for (auto i : m){
        cout <<i.first << " -> " << i.second << endl;
    }

    //to increment value at m["four"]
    m["four"]++; //now m["four"] = 5
}
```

Only difference here is that the output will not be in sorted order:

```css
4
four -> 4
three -> 3
two -> 2
one -> 1
```

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

To print all elements in a stack while popping:

```cpp
while (!s.empty()) {
      int curr = s.top();
      cout << curr;
      s.pop();
 }
```
You can't use `.size()` because the size changes every time you `pop`. So if you have 4 elements and you want to print all using a for loop, it'll only print the first 2 elements.
### STL Queue

Defined in the 
```cpp 
#include <queue>
``` 
header, the queue stl container uses the `.front()` method to get the item at the front of the queue and `.pop()` method actually removes the item in the front of the queue.

### Vectors

#### Initialize a vector

```cpp
vector<int> v(5); //[0,0,0,0,0]
vector<int> v(5, -1); //[-1,-1,-1,-1,-1]
```

You can declare and then initialize a vector as well.

```cpp
vector<int> v;
int size;
cin >> size; // 4
v.resize(size); //Would fill up with default values till size is reached: [0,0,0,0]
//or
v.resize(size,100) //Would fill up with 100 till size is reached: [100,100,100,100]
```

#### Erase From Vectors

Since erasing an element from a vector invalidates the iterator, we can't just iterate and erase. We have to use `std::iterator`:

```cpp
    for (int i = 0; i < vectorSize; i++){
        auto itr = myVec.begin();
        while (itr != myVec.end()){
            if (*itr == v){
                itr = myVec.erase(itr);
            } else {
                itr++;
            }
        }
    }
```

Here, we iterate over each element and check to see if its value is the one we're looking to delete. If so, we delete and move on to the next iteration.
We do not increment the iterator because once the element is deleted, the elements in the vector are moved one place to the left. Say itr is at index 4 (ie pointing to 2) and we want to delete 2: 

```
       itr
        |
4 8 6 3 2 9 5 4
0 1 2 3 4 5 6 7
```

We call erase and 2 is deleted and elements to the right of 2 are all moved to the left one position and vector size is decreased by 1:

```
       itr
        |
4 8 6 3 9 5 4
0 1 2 3 4 5 6 
```

Notice how itr is now automatically pointing to the next element over. `erase()` returns the modified iterator that we need to capture hence the line:
```cpp
itr = myVec.erase(itr);
```

We can then continue processing our vector.

Another way to delete is by index:

```cpp
vector<int> sortedEdges;
sortedEdges.push_back(12);
sortedEdges.push_back(13);
sortedEdges.push_back(14);
sortedEdges.push_back(15);
sortedEdges.erase(sortedEdges.begin()); // deletes at index 0 ie 12
sortedEdges.erase(sortedEdges.begin() + 1); // deletes at index 1 ie 13
sortedEdges.erase(sortedEdges.begin() + 2); // deletes at index 2 ie 14
```

#### Vector of vectors

```cpp
vector<vector<int>> adjList;
```

Initialize a 2D vector with m rows and n columns where each entry is -1:

```cpp
vector<vector<int>> vec(m, vector<int> (n, -1));
``` 

#### Assign and vectors

The assign() function either gives the current vector the values from start to end, or gives it num copies of val.
For example, the following code uses assign() to put 10 copies of the integer 42 into a vector:

```cpp
 vector<int> v;
 v.assign( 13, 42 ); //[42, 42, 42]
```

### C++ Ternary Operator

```cpp
int a = 10;
int b = 20;
// max = is a > b ? (Yes, a > b then max = a) : (No, a < b then max = b)
int max = a > b ? a : b;
cout << "Maximum value = " << max << endl;
```

### Pair

Defined in the `<utility>` header, a pair holds a pair of data types:

```cpp
#include <utility>

pair<int,string> pairOne(1,"one");
pair<int,string> pairTwo(2,"two");

cout << pairOne.first << " " << pairTwo.second << endl;

//Output:
// 1 two 
```

### Tuple
Defined in the 
```cpp
#include <tuple>
```
header, a tuple is a heterogeneous collection: it can be thought of as a row in a database. For example, if our database stores a Person, a tuple consisting of the person's name, number of accounts and average daily balance would be: ["John",2,31000.25]. 

You make a `tuple` using the `make_tuple()` function call:

```cpp
int main(){
    auto t = make_tuple("John", 2, 31000.25);
}
```

To extract items from a tuple you'd use the `get<index>(tuple_name)` call:


```cpp
int main(){
    auto t = make_tuple("John", 2, 31000.25);
    cout << get<2>(t) << endl; //prints 31000.25
    cout << get<0>(t) << endl; //prints John
    //Increment value in tuple:
    get<1>(t) += 1; // ("John", 3, 31000.25);
}
```

### Setting an integer to infinity
Defined in the 
```cpp
#include <limits>
```

header, you can set an integer to infinity like so:

```cpp
int a = numeric_limits<int>::max();
```

Which would be 2^31 - 1 (or 2 147 483 647) if int is 32 bits wide on your implementation.

### Char to Int

```cpp
int ia = int('a') - 97;
cout << ia << endl; //Prints 0
```

### ASCII to char

```cpp
    int a = 97;
    char b = a;
    cout << b << endl; //prints 'a' since 97 is a's decimal value
```

### Int to char

```cpp

char ch = 8 + '0';
//Converts 8 to its ASCII representation and adds to 0s ASCII then returns the value. 
//This value is converted to a character and saved to ch

```

**To conclude the above information**:

```cpp
int nineInt = '9' - '0'; //char to int
char nineString = 9 + '0'; //int to char
```

### Get number of digits in an integer

```cpp
#include <math.h>
int main(){
    int ans = log10(5432);
    cout << ans << endl; //prints 3
}
```

### Character to upper case

```cpp
#include <cctype>

char a='a';  
a=toupper(a);
cout<<a; //Prints A

```

### Use of Random and related ideas

Some problems might ask us to randomly pick from available choices. For example, to generate random numbers between 1 and 10 you'd do the following:
```cpp
  int num = rand() % 10 + 1;
```

The plus 1 is to define range from 1 to 10 instead of 0 to 9 which is determined via the `rand()` call. 

An interesting problem that asks us to use `rand`:

**Given an array of integers with possible duplicates, randomly output the index of a given target number. You can assume that the given target number must exist in the array.**

Example: A = {1,2,3,3,3,4,4}

If I ask for 3, your algorithm should return 2,3 or 4 (indices where the value 3 is present) with equal probability. Let's see how we can do so. First thing we want to do is create a hashtable to map value with index. We want a representation that looks like this:

```cpp
1 -> {0}
2 -> {1}
3 -> {2,3,4}
4 -> {5,6}
``` 

To do so, we'll create a hashtable where the container at each cell is a vector (since there might be duplicates):

```cpp
unordered_map<int,vector<int>> hashTable;
for (int i = 0; i < A.size(); i++){
    hashTable[nums[i]].push_back(i);
}
```

Ok, now that we've got our hash table, we can return a random element. To do so, we first need to get the vector of all positions. Say, we're asking for random index for 3:

```cpp
vector<int> v = hashTabl[3];
//v now looks like this:
// {2,3,4}
```

Next, we need to randomly pick a value, to do so, we'll do this:

```cpp
v[rand() % v.size()];
```

This will return a value between 0 and v.size() - 1. 


## Interesting problems 

### Single Numbers
[Single numbers](https://leetcode.com/articles/single-number/) Can you do it with $O(1)$ space and $O(N)$ time?

### Reverse an integer
Given an integer, return its digits in reversed order: 12345 -> 54321. Make sure to handle negative numbers.

```cpp
int Reversed(int num){
    int ans = 0;
    bool wasNeg = false;
    if (num < 0){
        wasNeg = true;
        num = num * (-1);
    }
    while (num != 0){
        ans = (ans * 10) + num % 10; //------------------> MEAT OF THE ALGO
        num = num/10;               //-------------------> MEAT OF THE ALGO
    }
    if (wasNeg)
        ans = ans * -1;
    return ans;
}
```

Ok, so the meat of the algo does this:
It is obvious that the modulo operator helps with extracting the last digit from the number. 
It first multiplies answer by 10. How does this help? Let's walk through an example: 65432
Initially, ans = 0. Then:

```cpp
ans = (ans * 10) + num % 10
0   =     0      + 2
num = num/10
```

So `ans = 2`. Now, we need to make space AFTER the 2 for the next integer. To make that space after the 2, we multiply the answer so far by 10. Why 10 only? becase we don't know in advance how many integers are left. Ok, so we multiply 2 by 10 so we're now at 20:

```cpp
ans = (2 * 10) + num % 10
ans = 20 + 3
num = num/10
```

now answer is 23. Notice how we're now building from the least significant digit end and keep multiplying the value by 10 to add the next digit.

### Reverse a string

```cpp
string s ="Bob likes Alice too";
reverse(s.begin(), s.end());
cout << s << endl; //oot ecilA sekil boB
```

The [reverse](http://www.cplusplus.com/reference/algorithm/reverse/) call takes $O(N/2)$ time where $N$ is the length of the string which translates to $O(N)$ time.

An example would be [this](/strings-problems/#reverse-words-in-a-string) problem.

### Check if a decimal integer is a palindrome

Given a decimal integer, check to see if it is a palindrome. For example, the function should return true for 123454321 and false for 123456554.

The strategy is to:

```css
  check        check 
    |           |
    5   4   4   5

If two are the same, remove those two

        4   4
Continue until not same or num goes to 0
```

```cpp{numberLines: true}
bool isPalindrome(int num){
    while (num != 0){
        int numberOfDigits = log10(num);
        int divideBy = pow(10,numberOfDigits);
        int msb = num/divideBy;
        int lsb = num % 10;
        if (! (msb == lsb))
            return false;
        num = num - (msb * divideBy);
        num = num/10;
    }
    return true;
}
```

The function first calculates the number of digits. To do so, we use the `log10()` function call in the `#include <math.h>` header. So now we have the number of digits. Say our `num` was 5445, then  `numberOfDigits` would equal 3. Next, we raise 10 to the power of `numberOfDigits` to help us isolate the MSB. Next, we use modulo operator to check the LSB. If they're not the same, we immediately return. Otherwise we drop the MSB and the LSB and retry.

OR we can create the number using the `isPalindrome` function and see if it matches with the original:

```cpp{numberLines: true}
bool isPalindromeReversed(int num){
    int ans = 0;
    int origNum = num;
    while (num != 0){
        ans = (ans * 10) + num % 10;
        num = num/10;
    }
    
    return (ans == origNum);
}
```

This approach however takes extra $O(1)$ space because we need to copy the original number somewhere to a variable so that we can compare at the end.

### Find difference in string

```cpp
char findTheDifference(string s, string t) {
    int ans = 0;
    int i = 0;
    for (; i < t.size(); i++){
        ans ^= s[i];
        ans ^= t[i];
        if (ans != 0)
            break;
    }
    return t[i];
}
```

Keep XORing the characters. Since equivalent characters cancel out, as soon as a mismatch is found, you can return the mismatched character. Same can be done for integers only if the integers are contiguous as described [here](https://stackoverflow.com/a/10766752/11556612)