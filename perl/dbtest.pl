#!/usr/bin/perl
use DBI;
use strict;

my $driver = "SQLite";
my $database = "appointment.db";
my $dsn = "DBI:$driver:database = $database";
my $userid = "";
my $password = "";

my $dbh = DBI->connect("$dsn","$userid","$password",{RaiseError => 1})
or die $DBI::errstr;


print "Connection Successful"; 
