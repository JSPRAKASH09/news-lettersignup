// C Program to demonstrate the three printf() statements
// that cause undefined behavior
#include <stdio.h>

// Driver Code
int main()
{
	int a=13;
    printf("%d %d %d %d %d",a++,--a,a++,++a,++a);
    
	return 0;
}
